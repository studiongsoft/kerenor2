# CampaignFormDialog

| שדה | ערך |
|-----|-----|
| Figma | מבצע חדש — הוספת/עריכת מבצע |
| סטטוס | רכיבי דף חדשים + שימוש ב-Dialog, TextField, Table קיימים |

## 2026-06-10 — מפרט Figma (מבצע חדש)

| מאפיין | ערך |
|--------|-----|
| גודל מודל | רוחב 900px; גובה לפי תוכן |
| ריווח בין אזורי טופס | 32px |
| ריווח אנכי גוף הטופס | 24px (למעלה/למטה) |
| כותרת ראשית | `h4` — Assistant Regular 34px |
| ריווח כותרת → שדה ראשון | 24px |
| כותרת משנית (ועידות) | `h5` — Assistant Regular 24px |
| גובה מינימלי טבלה | 190px |
| טקסט empty state | opacity 50% |
| כפתורים | ביטול (משני) מימין, שמור (ראשי) משמאל — `flex-end` + `@noflip` |

קבצים: `CampaignFormDialog.tsx`, `DialogFormHeader.tsx`, `AllocatedConferencesSection.tsx`, `tableStyles.ts`, `createKerenOrTheme.ts`.

## 2026-06-10

מודל הוספת/עריכת מבצע — פריסה לפי עיצוב:

- כותרת «מבצע חדש» מיושרת לימין, כפתור סגירה בפינה שמאלית (פיזית).
- שורה 1: שם המבצע*, תיאור.
- שורה 2: מועד התחלה*, מועד סיום — שדה משולב תאריך+שעה עם אייקון לוח שנה (`CampaignFormDateTimeField`).
- מפריד, כותרת «ועידות מוקצעות במבצע (N)», חיפוש + הוסף, טבלת ועידות.
- כפתורי שמור / ביטול צמודים לשמאל (`flexDirection: row /* @noflip */`).

קבצים: `CampaignFormDialog.tsx`, `CampaignFormDateTimeField.tsx`, `CampaignAllocatedConferencesSection.tsx`.
