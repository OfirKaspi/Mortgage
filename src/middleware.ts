import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getClientIP, validateRequestSize } from '@/lib/security';

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiter for API routes
const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '15 m'), // 10 requests per 15 minutes
  analytics: true,
  prefix: '@upstash/ratelimit/api',
});

// Allowed origins for CORS (add your production domain)
const getAllowedOrigins = (): string[] => {
  const origins: string[] = [];
  
  // Add production domain from environment
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    origins.push(process.env.NEXT_PUBLIC_SITE_URL);
  }
  
  // Add any additional allowed origins from environment
  if (process.env.ALLOWED_ORIGINS) {
    origins.push(...process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()));
  }
  
  return origins;
};

/**
 * Security headers to add to all responses
 */
function getSecurityHeaders() {
  const headers = new Headers();
  
  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://vercel.live https://*.vercel-insights.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  );
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection (legacy browsers)
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (formerly Feature Policy)
  headers.set(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',
    ].join(', ')
  );
  
  // Strict Transport Security (HSTS) - only in production
  if (process.env.NODE_ENV === 'production') {
    headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  return headers;
}

/**
 * Handle CORS for API routes
 */
function handleCORS(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) {
    return null;
  }
  
  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return null;
    }
  }
  
  // Check if origin is allowed
  const isAllowed = allowedOrigins.some(allowed => {
    try {
      const originUrl = new URL(origin);
      const allowedUrl = new URL(allowed);
      return originUrl.hostname === allowedUrl.hostname;
    } catch {
      return allowed === origin;
    }
  });
  
  if (!isAllowed && allowedOrigins.length > 0) {
    return new NextResponse(
      JSON.stringify({ error: 'CORS policy violation' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply security headers to all responses
  const response = NextResponse.next();
  const securityHeaders = getSecurityHeaders();
  
  // Copy security headers to response
  securityHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    const corsResponse = handleCORS(request);
    if (corsResponse) {
      return corsResponse;
    }
    
    // Add CORS headers for allowed origins
    const origin = request.headers.get('origin');
    const allowedOrigins = getAllowedOrigins();
    
    if (origin) {
      const isAllowed = process.env.NODE_ENV === 'development' 
        ? (origin.includes('localhost') || origin.includes('127.0.0.1'))
        : allowedOrigins.some(allowed => {
            try {
              const originUrl = new URL(origin);
              const allowedUrl = new URL(allowed);
              return originUrl.hostname === allowedUrl.hostname;
            } catch {
              return allowed === origin;
            }
          });
      
      if (isAllowed || allowedOrigins.length === 0) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('Access-Control-Max-Age', '86400');
      }
    }
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }
    
    // Rate limiting for API routes
    if (request.method === 'POST' && pathname.startsWith('/api/leads')) {
      try {
        const ip = getClientIP(request);
        
        // Skip rate limiting if Redis is not configured (development)
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
          console.warn('[SECURITY] Rate limiting disabled - Redis not configured');
        } else {
          const { success, limit, remaining, reset } = await apiRateLimiter.limit(ip);
          
          // Add rate limit headers
          response.headers.set('X-RateLimit-Limit', limit.toString());
          response.headers.set('X-RateLimit-Remaining', remaining.toString());
          response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());
          
          if (!success) {
            return NextResponse.json(
              { 
                success: false,
                message: 'יותר מדי בקשות. אנא נסה שוב מאוחר יותר.',
                error: 'Rate limit exceeded'
              },
              { 
                status: 429,
                headers: response.headers,
              }
            );
          }
        }
      } catch (error) {
        // If rate limiting fails, log but don't block the request
        console.error('[SECURITY] Rate limiting error:', error);
      }
    }
    
    // Validate request size for POST requests
    if (request.method === 'POST') {
      try {
        const body = await request.clone().text();
        if (!validateRequestSize(body)) {
          return NextResponse.json(
            {
              success: false,
              message: 'גודל הבקשה גדול מדי',
              error: 'Request too large'
            },
            {
              status: 413,
              headers: response.headers,
            }
          );
        }
      } catch (error) {
        console.error('[SECURITY] Request size validation error:', error);
      }
    }
  }
  
  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

