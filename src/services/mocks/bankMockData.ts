import type { BankRowData } from '../../types/bank';

export const MOCK_BANKS: BankRowData[] = [
  {
    id: 'b1',
    name: 'בנק לאומי',
    description: 'בנק משאבים לועידות מרכזיות',
    version: 'V2',
    conferenceCount: 12,
  },
  {
    id: 'b2',
    name: 'בנק הפועלים',
    description: 'קבוצת עורקים לפרויקטים ארוכי טווח',
    version: 'V1',
    conferenceCount: 8,
  },
  {
    id: 'b3',
    name: 'בנק דיסקונט',
    description: 'משאבים לשימוש עתידי בצפון',
    version: 'V3',
    conferenceCount: 5,
  },
  {
    id: 'b4',
    name: 'בנק מזרחי',
    description: 'ועידות אזוריות ותשתיות',
    version: 'V1',
    conferenceCount: 3,
  },
];
