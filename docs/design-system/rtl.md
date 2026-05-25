# RTL — חריגים וכללים

האתר והאפליקציה בפרויקט זה מוגדרים כ-**RTL תמיד**.

תשתית: [`design-system/theme/`](../../design-system/theme/).

## חריגים מתועדים

| אלמנט | סיבה | `dir` | תאריך | מאושר ע"י |
|-------|------|-------|-------|-----------|
| _(ריק — הוסיפו שורה לכל חריג)_ | | | | |

## דוגמאות לחריגים מוצדקים

- שדה מספרים בלבד (LTR לספרות)
- קטע קוד או URL באנגלית
- embed של צד שלישי שלא תומך ב-RTL

## Portal

`Dialog`, `Modal`, `Popover`, `Menu` — אם לא מוגדר `dir="rtl"` על `<html>`, העבירו `dir="rtl"` לרכיב עצמו.

ראו [Right-to-left](https://mui.com/material-ui/customization/right-to-left/).
