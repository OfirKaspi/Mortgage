import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Matches all paths under the domain
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Matches all paths under the domain
      },
    ],
  },
  // Security headers are handled by src/middleware.ts
  // This includes CSP, HSTS, X-Frame-Options, and other security headers
  // Rate limiting and CORS are also configured in the middleware
};

export default nextConfig;
