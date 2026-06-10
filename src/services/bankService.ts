import type { BankRowData } from '../types/bank';
import { withMockDelay } from './apiClient';
import { MOCK_BANKS } from './mocks/bankMockData';

export async function fetchBanks(): Promise<BankRowData[]> {
  return withMockDelay([...MOCK_BANKS]);
}

export async function saveBank(row: BankRowData): Promise<BankRowData> {
  return withMockDelay(row);
}

export async function deleteBank(_id: string): Promise<void> {
  await withMockDelay(undefined);
}
