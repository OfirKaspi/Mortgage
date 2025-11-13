import { z } from 'zod';

export const leadFormSchema = z.object({
  fullName: z.string().min(2, 'שם מלא חייב להכיל לפחות 2 תווים'),
  phone: z.string().regex(/^05\d{8}$/, 'מספר טלפון לא תקין'),
  email: z.string().email('כתובת אימייל לא תקינה').optional().or(z.literal('')),
  mortgageType: z
    .string()
    .refine(
      (val) => ['new', 'refinance', 'reverse'].includes(val),
      { message: 'אנא בחר סוג משכנתא' }
    ),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

