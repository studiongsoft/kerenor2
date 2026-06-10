import { z } from 'zod';
import {
  conferenceAllocationSchema,
  conferencesFieldSchema,
  type ConferenceAllocation,
} from './conferenceAllocationSchema';

/** @deprecated Use ConferenceAllocation */
export type CampaignConferenceAllocation = ConferenceAllocation;

export const campaignConferenceAllocationSchema = conferenceAllocationSchema;

export const campaignFormSchema = z.object({
  name: z.string().trim().min(1, 'שם המבצע חובה'),
  description: z.string(),
  startDate: z.string().trim().min(1, 'מועד התחלה חובה'),
  startTime: z.string().trim().min(1, 'שעת התחלה חובה'),
  endDate: z.string(),
  endTime: z.string(),
  conferences: conferencesFieldSchema,
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export const defaultCampaignFormValues: CampaignFormValues = {
  name: '',
  description: '',
  startDate: '',
  startTime: '00:00',
  endDate: '',
  endTime: '',
  conferences: [],
};
