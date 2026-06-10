import type { ConferenceAllocation } from '../types/conferenceAllocationSchema';
import type { ConferenceRowData } from '../types/conference';

export function conferenceRowToAllocation(row: ConferenceRowData): ConferenceAllocation {
  return {
    id: row.id,
    number: row.number,
    code: row.code,
    purpose: row.purpose,
    actualPurpose: row.purpose,
    conflicts: '----',
  };
}

export function filterAvailableConferences(
  pool: ConferenceRowData[],
  query: string,
  selectedIds: Set<string>,
): ConferenceRowData[] {
  const normalized = query.trim().toLowerCase();
  return pool.filter((row) => {
    if (selectedIds.has(row.id)) {
      return false;
    }
    if (!normalized) {
      return true;
    }
    const haystack = `${row.number} ${row.code} ${row.purpose} ${row.description}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
