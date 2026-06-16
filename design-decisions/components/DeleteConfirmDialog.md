# DeleteConfirmDialog

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-15 |
| Figma | [אישור מחיקה 12289:41621](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV/%D7%A7%D7%A8%D7%9F-%D7%90%D7%95%D7%A8-%D7%9B%D7%9C%D7%99%D7%9D?node-id=12289-41621) |
| קוד | `src/components/shared/DeleteConfirmDialog.tsx` |

## התאמה ל-Figma (RTL)

| מאפיין | Figma | יישום |
|--------|-------|--------|
| רוחב | 480px | `confirmDialogSlotProps` |
| כותרת | `h4` — Assistant Regular 34px | `Typography variant="h4"` |
| סגירה | × בפינה שמאלית (פיזית) | `CloseIcon` + `direction: ltr /* @noflip */` |
| אזהרה | `body2` secondary | `warningMessage` prop |
| שאלה | שם מודגש (semibold) | `fontWeight: 600` על `{name}` |
| כפתורים | מחיקה (contained error) משמאל, ביטול (outlined error) | `PrimarySecondaryActions` |
| ריווח | 16px | `px: 2`, `py: 2` |

## שינויים

### 2026-06-15 — Figma אישור מחיקה

- כותרת `h4` עם כפתור סגירה (במקום `DialogTitle`/`DialogActions` ברירת MUI)
- שורת אזהרה לפי סוג ישות (`deleteWarningMessages`)
- שם הפריט מודגש בשאלת האישור
- כפתור "מחיקה" (contained error) + "ביטול" (outlined error)

## מצבים שנבדקו

- [ ] Light + RTL
- [ ] Dark + RTL
- [ ] מבצע / בנק / ועידה
