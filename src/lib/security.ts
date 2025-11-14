import validator from 'validator';

/**
 * Security utilities for input sanitization, validation, and protection
 */

// Maximum lengths for input fields
export const MAX_LENGTHS = {
  NAME: 100,
  PHONE: 20,
  EMAIL: 255,
  MORTGAGE_TYPE: 20,
} as const;

// Request size limits (in bytes)
export const REQUEST_SIZE_LIMITS = {
  MAX_BODY_SIZE: 10 * 1024, // 10KB
} as const;

/**
 * Sanitize a string input by removing HTML tags and dangerous characters
 * Uses regex-based approach for server-side compatibility
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // First decode HTML entities to catch encoded attacks
  const decoded = input
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&#x60;/g, '`')
    .replace(/&#x3D;/g, '=');
  
  // Remove HTML tags using regex (server-safe)
  let sanitized = decoded.replace(/<[^>]*>/g, '');
  
  // Remove dangerous patterns
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/vbscript:/gi, '');
  
  // Then trim and normalize whitespace
  return sanitized.trim().replace(/\s+/g, ' ');
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return '';
  }
  
  const trimmed = email.trim().toLowerCase();
  
  // Validate email format
  if (!validator.isEmail(trimmed)) {
    return '';
  }
  
  return trimmed;
}

/**
 * Sanitize phone number (Israeli format)
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') {
    return '';
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Validate Israeli phone format (10 digits starting with 05)
  if (digitsOnly.length === 10 && digitsOnly.startsWith('05')) {
    return digitsOnly;
  }
  
  return '';
}

/**
 * Validate and sanitize name
 */
export function sanitizeName(name: string): string {
  if (typeof name !== 'string') {
    return '';
  }
  
  const sanitized = sanitizeString(name);
  
  // Check length
  if (sanitized.length < 2 || sanitized.length > MAX_LENGTHS.NAME) {
    return '';
  }
  
  // Check for only Hebrew/English letters and spaces
  if (!/^[\u0590-\u05FFa-zA-Z\s'-]+$/.test(sanitized)) {
    return '';
  }
  
  return sanitized;
}

/**
 * Validate request body size
 */
export function validateRequestSize(body: string | object): boolean {
  const size = typeof body === 'string' 
    ? Buffer.byteLength(body, 'utf8')
    : Buffer.byteLength(JSON.stringify(body), 'utf8');
  
  return size <= REQUEST_SIZE_LIMITS.MAX_BODY_SIZE;
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: Request): string {
  // Check various headers for the real IP (common in proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback to a default if we can't determine IP
  return 'unknown';
}

/**
 * Validate request origin/referer for CSRF protection
 */
export function validateOrigin(request: Request, allowedOrigins: string[]): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    if (origin?.includes('localhost') || origin?.includes('127.0.0.1')) {
      return true;
    }
    if (referer?.includes('localhost') || referer?.includes('127.0.0.1')) {
      return true;
    }
  }
  
  // Check origin
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const originHost = originUrl.hostname;
      
      if (allowedOrigins.some(allowed => {
        try {
          const allowedUrl = new URL(allowed);
          return allowedUrl.hostname === originHost;
        } catch {
          return allowed === originHost || allowed === origin;
        }
      })) {
        return true;
      }
    } catch {
      // Invalid origin URL
    }
  }
  
  // Check referer
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererHost = refererUrl.hostname;
      
      if (allowedOrigins.some(allowed => {
        try {
          const allowedUrl = new URL(allowed);
          return allowedUrl.hostname === refererHost;
        } catch {
          return allowed === refererHost || allowed === referer;
        }
      })) {
        return true;
      }
    } catch {
      // Invalid referer URL
    }
  }
  
  return false;
}

/**
 * Check if a string contains potentially dangerous content
 */
export function containsDangerousContent(input: string): boolean {
  if (typeof input !== 'string') {
    return false;
  }
  
  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onerror=, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
    /vbscript:/i,
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitize data for use in HTML (for email templates)
 * Escapes HTML entities to prevent XSS
 */
export function sanitizeForHTML(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Escape HTML entities to prevent XSS
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Log security event (for monitoring suspicious activity)
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>,
  request?: Request
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    event,
    details,
    ...(request && {
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
    }),
  };
  
  // In production, you might want to send this to a logging service
  console.warn('[SECURITY EVENT]', JSON.stringify(logData));
}

