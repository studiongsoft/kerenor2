import type { ConferenceRowData } from '../types/conference';
import { withMockDelay } from './apiClient';
import { MOCK_CONFERENCES } from './mocks/conferenceMockData';

export async function fetchConferences(): Promise<ConferenceRowData[]> {
  return withMockDelay([...MOCK_CONFERENCES]);
}

export async function saveConference(row: ConferenceRowData): Promise<ConferenceRowData> {
  return withMockDelay(row);
}

export async function deleteConference(_id: string): Promise<void> {
  await withMockDelay(undefined);
}
