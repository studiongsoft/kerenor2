import { z } from 'zod';

export const campaignFormSchema = z.object({
  name: z.string().trim().min(1, 'שם המבצע חובה'),
  startTime: z.string().trim().min(1, 'שעת התחלה חובה'),
  startDate: z.string().trim().min(1, 'תאריך התחלה חובה'),
  endTime: z.string().trim().min(1, 'שעת סיום חובה'),
  endDate: z.string().trim().min(1, 'תאריך סיום חובה'),
  version: z.string().trim().min(1, 'גרסה חובה'),
  conferencesText: z.string(),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export const defaultCampaignFormValues: CampaignFormValues = {
  name: '',
  startTime: '10:00',
  startDate: '',
  endTime: '18:00',
  endDate: '',
  version: 'V1',
  conferencesText: '',
};
