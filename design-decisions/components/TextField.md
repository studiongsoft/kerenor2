# TextField

| שדה | ערך |
|-----|-----|
| Figma | [node 11776:17406](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17406) |
| עדכון אחרון | 2026-06-10 |
| סטטוס | שונה ב-theme (לא ב-`OutlinedInput.js`) |

## 2026-06-10 — גובה אחיד 40px

- **איפה:** `src/theme/createKerenOrTheme.ts` — `MuiOutlinedInput`
- **שינוי:** שדות יחיד (כולל חיפוש ו-Autocomplete) — `height: 40px`; `multiline` ללא הגבלת גובה
- **לא שונה:** `packages/mui-material/src/OutlinedInput/OutlinedInput.js`

## 2026-05-17

חיפוש מבצע — `TextField` + `InputAdornment` + `SearchIcon` ב-`src/pages/PermissionsManagementPage.tsx` בלבד.
