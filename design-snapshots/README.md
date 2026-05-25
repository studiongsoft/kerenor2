# Design snapshots

צילומי מסך לפני ואחרי שינויי עיצוב — **חובה** לכל PR שמשנה רכיב או theme.

## שם קובץ

```text
YYYY-MM-DD-<component>-<state>.png
```

דוגמאות:

- `2026-05-17-button-light.png`
- `2026-05-17-button-dark.png`

## מה לצלם

כל שינוי רכיב חייב לכלול **שלושה מצבים**:

1. **RTL** (ברירת מחדל בפרויקט)
2. **Light mode**
3. **Dark mode**

## איפה לצלם

- SPA: `pnpm -F keren-or dev` → `/permissions`
- Playground: `pnpm docs:create-playground` → `pnpm docs:dev` → `/playground/`
- דמו בדוקס: `/material-ui/react-<component>/`

## עמודים

| עמוד | תיקייה |
|------|--------|
| ניהול מבצעים | [`permissions/`](./permissions/) |

## Git

קבצי PNG גדולים — אפשר להשתמש ב-Git LFS או לצרף ל-PR כ-attachments אם המדיניות מאפשרת.
