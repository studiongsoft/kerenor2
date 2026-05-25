# הגדרת GitHub לעבודת מעצבים

לאחר יצירת הקבצים בפרויקט, השלימו ב-GitHub:

## 1. CODEOWNERS

ערכו [CODEOWNERS](./CODEOWNERS) והחליפו `@design-lead` במשתמש או ב-team אמיתי, למשל:

```text
@your-org/design-team
```

## 2. תוויות PR

צרו ב-Repository → Labels:

| תווית | צבע מוצע | משמעות |
|-------|----------|--------|
| `needs-design-approval` | כתום | ממתין לאישור Design Lead |
| `design-conflict` | אדום | התנגשות בין שני שינויי עיצוב |

## 3. בחירת תבנית PR

בפתיחת PR, בחרו **design_system** מתוך רשימת התבניות (אם מופיעה).

## 4. הגנה על main (מומלץ)

Branch protection: דורש review מ-CODEOWNERS לפני merge ל-`master`/`main`.
