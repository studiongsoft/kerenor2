import type { ConferenceRowData } from '../../types/conference';

export const MOCK_CONFERENCES: ConferenceRowData[] = [
  {
    id: 'c1',
    number: '1001',
    code: 'CONF-TLV',
    purpose: 'ועידת מרכז',
    description: 'ועידה ראשית לתל אביב והמרכז',
  },
  {
    id: 'c2',
    number: '1002',
    code: 'CONF-N',
    purpose: 'ועידת צפון',
    description: 'כיסוי אזור חיפה והצפון',
  },
  {
    id: 'c3',
    number: '1003',
    code: 'CONF-S',
    purpose: 'ועידת דרום',
    description: 'כיסוי באר שבע והדרום',
  },
  {
    id: 'c4',
    number: '1004',
    code: 'CONF-HR',
    purpose: 'משאבי אנוש',
    description: 'ועידה ייעודית למשאבי אנוש',
  },
  {
    id: 'c5',
    number: '1005',
    code: 'CONF-OPS',
    purpose: 'תפעול',
    description: 'ועידת תפעול ולוגיסטיקה',
  },
];
