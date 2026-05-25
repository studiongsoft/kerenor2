/** נתוני ועידה לסינון (3.5.3) */
export interface ConferenceData {
  id: string;
  name: string;
  bank: string;
}

export interface CampaignRowData {
  id: string;
  name: string;
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  version: string;
  conferenceCount: number;
  conferences: ConferenceData[];
  actionType: 'stars' | 'actions';
}

export type CampaignSortColumn = 'name' | 'start' | 'end' | 'version' | 'conferenceCount';

export type SortDirection = 'asc' | 'desc';

export interface CampaignSortState {
  column: CampaignSortColumn;
  direction: SortDirection;
}

/** ברירת מחדל: תחילת מבצע עולה, מיון משני שם עולה (3.5.2) */
export const DEFAULT_CAMPAIGN_SORT: CampaignSortState = {
  column: 'start',
  direction: 'asc',
};

export type CampaignPermission = 'allocation' | 'view' | 'full';

export function canManageCampaigns(permission: CampaignPermission): boolean {
  return permission === 'allocation' || permission === 'full';
}
