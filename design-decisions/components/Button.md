# Button

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 |
| Figma | [node 11776:17405](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17405) |
| סטטוס | שונה ב-theme (לא ב-`Button.js`) |

## התאמה ל-Figma

| מאפיין | Figma | יישום |
|--------|-------|--------|
| primary.main | `#00838f` | `createKerenOrTheme` palette |
| padding | 8px 22px | `theme.spacing(1, 2.75)` ב-`contained` |
| גובה | 40px | `CONTROL_HEIGHT` ב-`createKerenOrTheme` |
| uppercase | כן | `typography.button.textTransform` |
| elevation | 2 | shadow ב-styleOverrides |

## שינויים

### 2026-06-10 — גובה אחיד 40px

- **איפה:** `src/theme/createKerenOrTheme.ts`
- **שינוי:** `contained`, `outlined`, `text`, `sizeSmall` — `height` / `minHeight` = `CONTROL_HEIGHT` (40px)
- **לא שונה:** `packages/mui-material/src/Button/Button.js`

### 2026-05-17 — דף ניהול מבצעים

- **איפה:** `src/theme/createKerenOrTheme.ts`
- **לא שונה:** `packages/mui-material/src/Button/Button.js`
