import { z } from 'zod';

export const conferenceFormSchema = z.object({
  number: z
    .string()
    .trim()
    .regex(/^\d{7}$/, 'מספר ועידה חייב להיות 7 ספרות'),
  purpose: z.string().trim().min(1, 'ייעוד חובה'),
  code: z
    .string()
    .trim()
    .refine((value) => value === '' || /^\d{3}$/.test(value), 'קוד חייב להיות 3 ספרות'),
  description: z.string(),
});

export type ConferenceFormValues = z.infer<typeof conferenceFormSchema>;

export const defaultConferenceFormValues: ConferenceFormValues = {
  number: '',
  purpose: '',
  code: '',
  description: '',
};
