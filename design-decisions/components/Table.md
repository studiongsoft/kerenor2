# Table / TableRow

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 |
| Figma | [TableCellRow 11776:17413](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17413) |
| קוד | `src/components/campaigns/CampaignTableRow.tsx` |

## התאמה ל-Figma (RTL)

| מאפיין | Figma | יישום |
|--------|-------|--------|
| גובה שורת גוף / תא גוף | 62px | `MuiTableRow`, `tableBodyCellSx`, `MuiTableCell` body |
| גובה תא כותרת | 40px | `tableHeadCellSx`, `MuiTableCell` head, `MuiTableHead` |
| קו תא (stroke) | `#000000` 12% → `rgba(0, 0, 0, 0.12)` | `MuiTableCell` head/body `borderBottom` |
| אייקון מיון (ברירת מחדל) | 60% opacity | `MuiTableSortLabel` icon |
| padding תא | 16px | `py: 2, px: 2` |
| תאריך/שעה | caption 12px מעל, body2 14px מתחת, `textAlign: start` (ימין ב-RTL) | `DateTimeCell` + `TableCellText` |
| כל תאי גוף | `textAlign: right /* @noflip */` (stylis RTL לא הופך), LTR עם `direction: ltr /* @noflip */` | `tableBodyCellSx` + `TableCellText` |
| כותרות עמודות | יישור ימין + `TableSortLabel` לימין | `tableHeadCellSx` |
| כמות ועידות | `#006064` (primary.dark) | `color="primary.dark"` |
| שם בנק / שם מבצע / מס׳ ועידה | primary | `tablePrimaryCellContentSx` / `tablePrimaryCellLtrContentSx` |
| כוכבים (RTL) | ריק → כחול → אדום, מפרידים אנכיים | `StarActions` + `Stack divider` |
| פעולות (RTL) | הורדה \| מחיקה \| עריכה, uppercase 14px | `TextActions` |
| עמודת פעולות | שמאל בטבלה | `align="left"` על תא אחרון ב-DOM |

## שינויים

### 2026-06-10 — מצב כהה (עדכון צבעים)

- `primary.main`: `#00BCD4`; `primary.dark`: `#00ACC1`
- רקע טבלה (מכל + שורות + כותרת): `#1E1E1E`
- טקסט ראשי: `#FFFFFF` (ללא `#000000` קשיח — `theme.palette.text.primary`); משני: 70% לבן
- גבולות: `rgba(255, 255, 255, 0.12)`; אייקוני פעולות: `action.active` 70%

### 2026-06-10 — מצב כהה (פלטה מעודכנת)

- רקע עמוד: `#1D1D1D`; סרגל עליון: `#272727`; תפריט צד: `#232323`

### 2026-06-10 — מידות טבלה ומיון

- גוף: שורות ותאים 62px; כותרות 40px
- גבול תא: `rgba(0, 0, 0, 0.12)` (במצב כהה: `rgba(255, 255, 255, 0.12)`)
- חץ `TableSortLabel`: 60% opacity בברירת מחדל; 100% ב-hover וב-active

### 2026-05-19 — שורת טבלה לפי Figma

- חולץ `CampaignTableRow` מ-`src/pages/PermissionsManagementPage.tsx`
- תוקן סדר כוכבים ל-RTL
- כפתורי פעולות: `variant="text"` עם מפרידים אנכיים במקום `ButtonGroup`
