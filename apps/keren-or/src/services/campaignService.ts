import type { CampaignRowData } from '../types/campaign';
import { withMockDelay } from './apiClient';
import { MOCK_CAMPAIGNS } from './mocks/campaignMockData';

/** Replace mock implementation with apiClient.get/post/delete when connecting real API. */
export async function fetchCampaigns(): Promise<CampaignRowData[]> {
  return withMockDelay([...MOCK_CAMPAIGNS]);
}

export async function saveCampaign(row: CampaignRowData): Promise<CampaignRowData> {
  return withMockDelay(row);
}

export async function deleteCampaign(_id: string): Promise<void> {
  await withMockDelay(undefined);
}
