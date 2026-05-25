# חוזה עיצוב ↔ פיתוח

מסמך זה מגדיר את **גבולות האחריות** בין צוות העיצוב לצוות הפיתוח בפרויקט קרן אור.

---

## מטרה

| צוות | מספק |
|------|------|
| **עיצוב** | UI מ-Figma, Design System, mock data, stores stubs |
| **פיתוח** | API אמיתי, לוגיקה עסקית, auth, production |

---

## מותר לצוות העיצוב

| פעולה | היכן |
|--------|------|
| הרכבת עמודים מרכיבים קיימים | `apps/keren-or/src/pages/` |
| קומפוננטות ספצificיות לעמוד | `apps/keren-or/src/components/` |
| שינוי מראה רכיב MUI | `packages/mui-material/src/<Component>/` |
| Theme tokens ו-overrides | `apps/keren-or/src/theme/` |
| Mock store (MobX) | `apps/keren-or/src/stores/` |
| Mock service + interface | `apps/keren-or/src/services/` |
| רישום route | `apps/keren-or/src/routes/` |
| `sx` ל-layout בלבד | margin, gap, grid, flex — **לא** מראה קבוע של רכיב |
| תיעוד רכיב | `design-decisions/components/<Name>.md` |

---

## אסור לצוות העיצוב

| פעולה | למה |
|--------|-----|
| קריאות Axios ישירות מקומפוננטה | שובר הפרדת שכבות |
| `styled()` / override theme בדף | שינוי מראה שייך לרכיב או theme |
| Hex colors קשיחים בדף | חייבים לבוא מ-`theme.palette` |
| `dir="ltr"` על containers | האפליקציה RTL (חריגים: `docs/design-system/rtl.md`) |
| לוגיקה עסקית ב-UI | שייכת ל-store |
| דילוג על Loading / Error / Empty | פיתוח צריך את כל המצבים |
| קוד דף כש-Figma ≠ רכיב | **עצירה** + דוח שינוי רכיב |
| העתקת קוד רכיב לדף | דפים מרכיבים בלבד |

---

## כלל עצירה (STOP)

אם העיצוב ב-Figma **לא תואם** לרכיב בקוד:

1. **עוצרים** — לא בונים override בדף
2. ממלאים דוח לפי [stop-report-template](../../.cursor/skills/figma-design-implementation/stop-report-template.md)
3. ממתינים לאישור Design Lead
4. מתאימים את הרכיב ב-`packages/mui-material/src/`
5. מעדכנים `design-decisions/components/<Name>.md`
6. רק אז ממשיכים לבניית העמוד

---

## דרישות חובה לכל עמוד

- [ ] RTL + `lang="he"`
- [ ] Light + Dark נבדקו
- [ ] Loading state
- [ ] Error state + retry
- [ ] Empty state
- [ ] Responsive desktop
- [ ] Store stub + mock service
- [ ] Route רשום
- [ ] קישור Figma ב-header של קובץ העמוד

---

## תהליך PR

1. Branch מ-`master`
2. מילוי [PAGE-CHECKLIST.md](./PAGE-CHECKLIST.md)
3. עדכון `design-decisions/` לכל רכיב שנגעו בו
4. צילומי light + dark + RTL (PR או `design-snapshots/`)
5. PR עם תבנית design system
6. תיוג `needs-design-approval` אם יש התנגשות עיצובית

---

## Rollback

כל שינוי רכיב חייב לציין ב-`design-decisions/` את ה-commit ל-`git revert`.
