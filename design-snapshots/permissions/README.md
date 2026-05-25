# Permissions — design snapshots

צילומי מסך לעמוד **ניהול מבצעים / הרשאות** (`/permissions`).

## קבצים

| קובץ | מצב |
|------|-----|
| `2026-05-25-permissions-light.png` | Light + RTL |
| `2026-05-25-permissions-dark.png` | Dark + RTL |

## איך לצלם

```bash
pnpm -F keren-or dev
```

1. פתחו http://localhost:5173/permissions
2. צלמו **Light mode** (ברירת מחדל)
3. החליפו ל-**Dark mode** (`DesignModeToggle` ב-AppBar) וצלמו שוב
4. שמרו כאן לפי [../README.md](../README.md)

## Figma

https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17394

## קוד

- עמוד: `apps/keren-or/src/pages/PermissionsManagementPage.tsx`
- רכיבים: `apps/keren-or/src/components/campaigns/`
