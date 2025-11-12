export const CONFIG = {
  // REDIS
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || "",
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",

  // ZOHO
  ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID || "",
  ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET || "",
  ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN || "",
  ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || "",

  // CRON JOB
  CRON_SECRET: process.env.CRON_SECRET || "",

  // GOOGLE
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || "",

  // SUPABASE
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

  // GENERAL DETAILS
  facebookUsername: "the.levelup.agency",
  instagramUsername: "the.levelup.agency",
  whatsappNumber: "972509007479",
  phoneNumber: "0509007479",
  contactEmail: "ezmashcanta@gmail.com",
  contactAddress: "הרב אבא אבוחצירא 9 שדרות",
  contactName: "אלירן זיתונה",
  lat: 32.05066446929389,
  lng: 34.79935393068719,
  year: 2025,
} as const;
