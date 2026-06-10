import { z } from 'zod';
import { conferencesFieldSchema } from './conferenceAllocationSchema';

export const bankFormSchema = z.object({
  name: z.string().trim().min(1, 'שם הבנק חובה'),
  description: z.string(),
  conferences: conferencesFieldSchema,
});

export type BankFormValues = z.infer<typeof bankFormSchema>;

export const defaultBankFormValues: BankFormValues = {
  name: '',
  description: '',
  conferences: [],
};
