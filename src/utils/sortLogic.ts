import type { SortDirection, SortState } from '../types/table';

export function toggleSort<C extends string>(current: SortState<C>, column: C): SortState<C> {
  if (current.column === column) {
    return {
      column,
      direction: current.direction === 'asc' ? 'desc' : 'asc',
    };
  }
  return { column, direction: 'asc' };
}

export function compareStrings(a: string, b: string, direction: SortDirection): number {
  const result = a.localeCompare(b, 'he', { sensitivity: 'base' });
  return direction === 'asc' ? result : -result;
}

export function compareNumbers(a: number, b: number, direction: SortDirection): number {
  const result = a - b;
  return direction === 'asc' ? result : -result;
}
