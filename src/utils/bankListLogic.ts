import type { BankRowData, BankSortColumn, BankSortState } from '../types/bank';
import { compareNumbers, compareStrings } from './sortLogic';

function compareByColumn(
  a: BankRowData,
  b: BankRowData,
  column: BankSortColumn,
  direction: BankSortState['direction'],
): number {
  switch (column) {
    case 'name':
      return compareStrings(a.name, b.name, direction);
    case 'description':
      return compareStrings(a.description, b.description, direction);
    case 'version':
      return compareStrings(a.version, b.version, direction);
    case 'conferenceCount':
      return compareNumbers(a.conferenceCount, b.conferenceCount, direction);
    default:
      return 0;
  }
}

export function sortBanks(rows: BankRowData[], sort: BankSortState): BankRowData[] {
  return [...rows].sort((a, b) => compareByColumn(a, b, sort.column, sort.direction));
}

export function filterBanks(rows: BankRowData[], query: string): BankRowData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }
  return rows.filter((row) =>
    [row.name, row.description, row.version, String(row.conferenceCount)]
      .join(' ')
      .toLowerCase()
      .includes(normalized),
  );
}
