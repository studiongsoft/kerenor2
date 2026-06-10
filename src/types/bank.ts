import type { SortState } from './table';

export interface BankRowData {
  id: string;
  name: string;
  description: string;
  version: string;
  conferenceCount: number;
}

export type BankSortColumn = 'name' | 'description' | 'version' | 'conferenceCount';

export type BankSortState = SortState<BankSortColumn>;

export const DEFAULT_BANK_SORT: BankSortState = {
  column: 'name',
  direction: 'asc',
};
