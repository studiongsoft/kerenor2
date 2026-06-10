import type {
  CampaignRowData,
  CampaignSortColumn,
  CampaignSortState,
  ConferenceData,
  SortDirection,
} from '../types/campaign';
import { compareNumbers, compareStrings, toggleSort as toggleSortState } from './sortLogic';

export function toggleSort(
  current: CampaignSortState,
  column: CampaignSortColumn,
): CampaignSortState {
  return toggleSortState(current, column);
}

function parseDateTime(date: string, time: string): number {
  const [day, month, year] = date.split('/').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes).getTime();
}

function compareByColumn(
  a: CampaignRowData,
  b: CampaignRowData,
  column: CampaignSortColumn,
  direction: SortDirection,
): number {
  switch (column) {
    case 'name':
      return compareStrings(a.name, b.name, direction);
    case 'start':
      return compareNumbers(
        parseDateTime(a.startDate, a.startTime),
        parseDateTime(b.startDate, b.startTime),
        direction,
      );
    case 'end':
      return compareNumbers(
        parseDateTime(a.endDate, a.endTime),
        parseDateTime(b.endDate, b.endTime),
        direction,
      );
    case 'version':
      return compareStrings(a.version, b.version, direction);
    case 'conferenceCount':
      return compareNumbers(a.conferenceCount, b.conferenceCount, direction);
    default:
      return 0;
  }
}

/** מיון ראשי לפי עמודה + מיון משני תמיד לפי שם עולה (3.5.2) */
export function sortCampaigns(
  rows: CampaignRowData[],
  sort: CampaignSortState,
): CampaignRowData[] {
  return [...rows].sort((a, b) => {
    const primary = compareByColumn(a, b, sort.column, sort.direction);
    if (primary !== 0) {
      return primary;
    }
    if (sort.column !== 'name') {
      return compareByColumn(a, b, 'name', 'asc');
    }
    return 0;
  });
}

function collectSearchableText(row: CampaignRowData): string {
  const campaignFields = [
    row.name,
    row.startTime,
    row.startDate,
    row.endTime,
    row.endDate,
    row.version,
    String(row.conferenceCount),
  ];

  const conferenceFields = row.conferences.flatMap((c) => [c.name, c.bank, c.id]);

  return [...campaignFields, ...conferenceFields].join(' ').toLowerCase();
}

/** סינון חלקי בכל שדות מבצע וועידה (3.5.3–3.5.4) */
export function filterCampaigns(rows: CampaignRowData[], query: string): CampaignRowData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return rows;
  }

  return rows.filter((row) => collectSearchableText(row).includes(normalized));
}

export function syncConferenceCount(row: CampaignRowData): CampaignRowData {
  return {
    ...row,
    conferenceCount: row.conferences.length,
  };
}

export function parseConferencesFromText(text: string): ConferenceData[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [name, bank = ''] = line.split('|').map((part) => part.trim());
      return {
        id: `conf-${Date.now()}-${index}`,
        name: name || line,
        bank,
      };
    });
}

export function formatConferencesForForm(conferences: ConferenceData[]): string {
  return conferences.map((c) => (c.bank ? `${c.name} | ${c.bank}` : c.name)).join('\n');
}
