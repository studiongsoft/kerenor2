export type SortDirection = 'asc' | 'desc';

export interface SortState<C extends string = string> {
  column: C;
  direction: SortDirection;
}

export interface DataTableColumn<C extends string = string> {
  id: C;
  label: string;
  sortable?: boolean;
}

export const TABLE_ROWS_PER_PAGE = 10;
