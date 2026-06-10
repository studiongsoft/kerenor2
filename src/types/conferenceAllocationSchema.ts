import { z } from 'zod';

export const conferenceAllocationSchema = z.object({
  id: z.string(),
  number: z.string(),
  code: z.string(),
  purpose: z.string(),
  actualPurpose: z.string(),
  conflicts: z.string(),
});

export type ConferenceAllocation = z.infer<typeof conferenceAllocationSchema>;

export const conferencesFieldSchema = z
  .array(conferenceAllocationSchema)
  .min(1, 'חובה לבחור לפחות ועידה אחת');
