import { z } from 'zod';
import { MAX_LENGTHS, sanitizeName, sanitizeEmail, sanitizePhone } from './security';

/**
 * Enhanced validation schema with sanitization and length limits
 */
export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'שם מלא חייב להכיל לפחות 2 תווים')
    .max(MAX_LENGTHS.NAME, `שם מלא לא יכול להכיל יותר מ-${MAX_LENGTHS.NAME} תווים`)
    .refine(
      (val) => {
        const sanitized = sanitizeName(val);
        return sanitized.length >= 2 && sanitized.length <= MAX_LENGTHS.NAME;
      },
      { message: 'שם מלא מכיל תווים לא תקינים' }
    )
    .transform((val) => sanitizeName(val)),
  
  phone: z
    .string()
    .regex(/^05\d{8}$/, 'מספר טלפון לא תקין')
    .max(MAX_LENGTHS.PHONE, `מספר טלפון לא יכול להכיל יותר מ-${MAX_LENGTHS.PHONE} תווים`)
    .refine(
      (val) => {
        const sanitized = sanitizePhone(val);
        return sanitized.length === 10 && sanitized.startsWith('05');
      },
      { message: 'מספר טלפון לא תקין' }
    )
    .transform((val) => sanitizePhone(val)),
  
  email: z
    .string()
    .max(MAX_LENGTHS.EMAIL, `כתובת אימייל לא יכולה להכיל יותר מ-${MAX_LENGTHS.EMAIL} תווים`)
    .email('כתובת אימייל לא תקינה')
    .optional()
    .or(z.literal(''))
    .transform((val) => {
      if (!val || val === '') return '';
      return sanitizeEmail(val);
    }),
  
  mortgageType: z
    .string()
    .max(MAX_LENGTHS.MORTGAGE_TYPE, `סוג משכנתא לא יכול להכיל יותר מ-${MAX_LENGTHS.MORTGAGE_TYPE} תווים`)
    .refine(
      (val) => ['new', 'refinance', 'reverse'].includes(val),
      { message: 'אנא בחר סוג משכנתא' }
    ),
  
  // Honeypot field for bot protection (should be empty)
  website: z
    .string()
    .max(0, 'שדה זה צריך להיות ריק')
    .optional()
    .default(''),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * Server-side validation schema (more strict, used in API routes)
 */
export const serverLeadSchema = z.object({
  name: z
    .string()
    .min(2, 'שם הוא שדה חובה')
    .max(MAX_LENGTHS.NAME, `שם לא יכול להכיל יותר מ-${MAX_LENGTHS.NAME} תווים`)
    .refine(
      (val) => {
        const sanitized = sanitizeName(val);
        return sanitized.length >= 2;
      },
      { message: 'שם מכיל תווים לא תקינים' }
    )
    .optional(),
  
  fullName: z
    .string()
    .min(2, 'שם הוא שדה חובה')
    .max(MAX_LENGTHS.NAME, `שם לא יכול להכיל יותר מ-${MAX_LENGTHS.NAME} תווים`)
    .refine(
      (val) => {
        const sanitized = sanitizeName(val);
        return sanitized.length >= 2;
      },
      { message: 'שם מכיל תווים לא תקינים' }
    )
    .optional(),
  
  phone: z
    .string()
    .min(10, 'טלפון הוא שדה חובה')
    .max(MAX_LENGTHS.PHONE, `טלפון לא יכול להכיל יותר מ-${MAX_LENGTHS.PHONE} תווים`)
    .refine(
      (val) => {
        const sanitized = sanitizePhone(val);
        return sanitized.length === 10;
      },
      { message: 'מספר טלפון לא תקין' }
    ),
  
  email: z
    .string()
    .max(MAX_LENGTHS.EMAIL, `אימייל לא יכול להכיל יותר מ-${MAX_LENGTHS.EMAIL} תווים`)
    .refine(
      (val) => {
        if (!val || val === '') return true;
        const sanitized = sanitizeEmail(val);
        return sanitized.length > 0;
      },
      { message: 'כתובת אימייל לא תקינה' }
    )
    .optional()
    .default(''),
  
  mortgageType: z
    .string()
    .max(MAX_LENGTHS.MORTGAGE_TYPE)
    .refine(
      (val) => ['new', 'refinance', 'reverse'].includes(val),
      { message: 'סוג משכנתא לא תקין' }
    ),
  
  // Honeypot field - should be empty or undefined
  website: z
    .string()
    .max(0, 'Bot detected')
    .optional()
    .default(''),
  
  // UTM parameters (optional, for tracking)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  source: z.string().optional(),
});

