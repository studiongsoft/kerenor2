import type { SortState } from './table';

export interface ConferenceRowData {
  id: string;
  number: string;
  code: string;
  purpose: string;
  description: string;
}

export type ConferenceSortColumn = 'number' | 'code' | 'purpose' | 'description';

export type ConferenceSortState = SortState<ConferenceSortColumn>;

export const DEFAULT_CONFERENCE_SORT: ConferenceSortState = {
  column: 'number',
  direction: 'asc',
};
