import type {
  ConferenceRowData,
  ConferenceSortColumn,
  ConferenceSortState,
} from '../types/conference';
import { compareStrings } from './sortLogic';

function compareByColumn(
  a: ConferenceRowData,
  b: ConferenceRowData,
  column: ConferenceSortColumn,
  direction: ConferenceSortState['direction'],
): number {
  switch (column) {
    case 'number':
      return compareStrings(a.number, b.number, direction);
    case 'code':
      return compareStrings(a.code, b.code, direction);
    case 'purpose':
      return compareStrings(a.purpose, b.purpose, direction);
    case 'description':
      return compareStrings(a.description, b.description, direction);
    default:
      return 0;
  }
}

export function sortConferences(
  rows: ConferenceRowData[],
  sort: ConferenceSortState,
): ConferenceRowData[] {
  return [...rows].sort((a, b) => compareByColumn(a, b, sort.column, sort.direction));
}

export function filterConferences(rows: ConferenceRowData[], query: string): ConferenceRowData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }
  return rows.filter((row) =>
    [row.number, row.code, row.purpose, row.description]
      .join(' ')
      .toLowerCase()
      .includes(normalized),
  );
}
