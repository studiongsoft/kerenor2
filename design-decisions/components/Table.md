# Table / TableRow

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-05-19 |
| Figma | [TableCellRow 11776:17413](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17413) |
| קוד | `apps/keren-or/src/components/campaigns/CampaignTableRow.tsx` |

## התאמה ל-Figma (RTL)

| מאפיין | Figma | יישום |
|--------|-------|--------|
| גובה שורה | 56px | `MuiTableRow` + `rowSx` |
| padding תא | 16px | `py: 2, px: 2` |
| תאריך/שעה | caption 12px מעל, body2 14px מתחת, `textAlign: start` (ימין ב-RTL) | `DateTimeCell` + `TableCellText` |
| כל תאי גוף | `textAlign: right /* @noflip */` (stylis RTL לא הופך), LTR עם `direction: ltr /* @noflip */` | `tableBodyCellSx` + `TableCellText` |
| כותרות עמודות | יישור ימין + `TableSortLabel` לימין | `tableHeadCellSx` |
| כמות ועידות | `#006064` (primary.dark) | `color="primary.dark"` |
| כוכבים (RTL) | ריק → כחול → אדום, מפרידים אנכיים | `StarActions` + `Stack divider` |
| פעולות (RTL) | הורדה \| מחיקה \| עריכה, uppercase 14px | `TextActions` |
| עמודת פעולות | שמאל בטבלה | `align="left"` על תא אחרון ב-DOM |

## שינויים

### 2026-05-19 — שורת טבלה לפי Figma

- חולץ `CampaignTableRow` מ-`apps/keren-or/src/pages/PermissionsManagementPage.tsx`
- תוקן סדר כוכבים ל-RTL
- כפתורי פעולות: `variant="text"` עם מפרידים אנכיים במקום `ButtonGroup`
