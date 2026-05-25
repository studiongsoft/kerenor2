# Button

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-05-17 |
| Figma | [node 11776:17405](https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17405) |
| סטטוס | שונה ב-theme (לא ב-`Button.js`) |

## התאמה ל-Figma

| מאפיין | Figma | יישום |
|--------|-------|--------|
| primary.main | `#00838f` | `createKerenOrTheme` palette |
| padding | 8px 22px | `theme.spacing(1, 2.75)` ב-`contained` |
| גובה | 42px מקס׳ | `theme.spacing(5.25)` — זהה ל-Tab |
| uppercase | כן | `typography.button.textTransform` |
| elevation | 2 | shadow ב-styleOverrides |

## שינויים

### 2026-05-17 — דף ניהול מבצעים

- **איפה:** `src/theme/createKerenOrTheme.ts`
- **לא שונה:** `packages/mui-material/src/Button/Button.js`
