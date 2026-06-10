# ListItemButton

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 |
| סטטוס | שונה ב-theme (לא ב-`ListItemButton.js`) |

## שינויים

### 2026-06-09 — סרגל ניווט צדדי

- **איפה:** `src/theme/createKerenOrTheme.ts`
- **פריט ניווט:** `margin: 8px`, `border-radius: 8px`
- **פריט נבחר:** רקע `#E7F3F5`, ללא פס הדגשה (`border-inline-start`), טקסט `primary.main` במשקל 600
- **טקסט:** `text-align: right` על `.MuiListItemText-primary`
- **לא שונה:** `packages/mui-material/src/ListItemButton/ListItemButton.js`

### 2026-06-10 — מצב כהה

- **פריט לא נבחר:** `text.secondary`, אייקון `img` ב-opacity 0.55
- **פריט נבחר:** רקע `rgba(0, 188, 212, 0.16)`, טקסט ואייקון `primary.main` (`#00BCD4`)
- **hover:** `rgba(0, 188, 212, 0.08)` במצב כהה
