import type { CampaignConferenceAllocation, CampaignFormValues } from '../types/campaignFormSchema';
import type { CampaignRowData, ConferenceData } from '../types/campaign';
import { syncConferenceCount } from './campaignListLogic';

export { conferenceRowToAllocation, filterAvailableConferences } from './conferenceAllocationLogic';

/** DD/MM/YYYY */
export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) {
    return '';
  }
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) {
    return isoDate;
  }
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

export function parseDisplayDate(display: string): string {
  const match = display.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return '';
  }
  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function formatDateTimeField(date: string, time: string): string {
  if (!date) {
    return '';
  }
  return time ? `${date} | ${time}` : date;
}

export function isoDateFromDisplay(displayDate: string): string {
  return parseDisplayDate(displayDate);
}

export function allocationToConferenceData(row: CampaignConferenceAllocation): ConferenceData {
  return {
    id: row.id,
    name: row.purpose,
    bank: row.code,
  };
}

export function conferenceDataToAllocation(
  conference: ConferenceData,
  index: number,
): CampaignConferenceAllocation {
  return {
    id: conference.id,
    number: String(1_000_000 + index),
    code: conference.bank || '---',
    purpose: conference.name,
    actualPurpose: conference.name,
    conflicts: '----',
  };
}

export function fromCampaignRow(row: CampaignRowData): CampaignFormValues {
  return {
    name: row.name,
    description: '',
    startDate: row.startDate,
    startTime: row.startTime,
    endDate: row.endDate,
    endTime: row.endTime,
    conferences: row.conferences.map(conferenceDataToAllocation),
  };
}

export function toCampaignRow(values: CampaignFormValues, existing?: CampaignRowData): CampaignRowData {
  const conferences = values.conferences.map(allocationToConferenceData);
  const base: CampaignRowData = {
    id: existing?.id ?? `campaign-${Date.now()}`,
    name: values.name.trim(),
    startTime: values.startTime.trim(),
    startDate: values.startDate.trim(),
    endTime: values.endTime.trim(),
    endDate: values.endDate.trim(),
    version: existing?.version ?? 'V1',
    conferences,
    conferenceCount: conferences.length,
    actionType: existing?.actionType ?? 'actions',
  };
  return syncConferenceCount(base);
}

