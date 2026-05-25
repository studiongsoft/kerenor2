---
name: figma-design-implementation
description: >-
  Implements Figma designs into code using existing project components (RTL).
  Stops when Figma and code diverge and reports required component-level changes.
  Documents every component change in a companion MD file. Creates missing
  components when needed; asks the user when uncertain. Use when implementing
  Figma, design handoff, building pages from mockups, or design-to-code in Hebrew/RTL.
---

# הטמעת עיצוב מ-Figma לקוד

## חוקים (חובה)

1. **העמוד הוא RTL** — תמיד `AppThemeProvider` מ-`@studiongsoft/design-lead` (או שקול: `direction: 'rtl'`, stylis RTL, `dir="rtl"`). ראו [DESIGN-TO-CODE.md](../../../DESIGN-TO-CODE.md).

2. **רכיבים קיימים בפרויקט** — בנה דפים רק מרכיבים שכבר בקוד (`packages/mui-material/src/`, `@mui/material`). **אם העיצוב ב-Figma לא תואם לרכיב בקוד — עצור.** אל תעקוף בעיצוב inline בדף. הצג דוח שינויים נדרשים ברכיב עצמו (ראו [stop-report-template.md](stop-report-template.md)) והמתן לאישור לפני המשך.

3. **קובץ MD לכל רכיב** — לכל רכיב שנגעת בו, עדכן/צור `design-decisions/components/<ComponentName>.md` לפי [component-doc-template.md](component-doc-template.md).

4. **רכיב חסר** — אם אין מקבילה בקוד: צור רכיב חדש ב-`packages/mui-material/src/<ComponentName>/` (או `packages/mui-lab` אם ניסיוני), עדכן את ה-MD, ורק אז השתמש בדף. **אם יש התלבטות** (שם, מיקום, API, האם זה variant או רכיב חדש) — **שאל את המשתמש** לפני יצירה.

---

## תהליך עבודה

```
┌─────────────────┐
│ 1. קלט עיצוב   │  Figma URL / צילום / specs
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. מיפוי רכיבים │  Figma layer → קוד (Code Connect, חיפוש src/)
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. השוואה      │  tokens: צבע, radius, spacing, typography, states
└────────┬────────┘
         │
    ┌────┴────┐
    │ זהה?   │
    └────┬────┘
  לא │      │ כן
     ▼      ▼
  STOP    4. דף RTL
  דוח      (הרכבה בלבד)
  שינוי
  רכיב
     │
     └──► אישור משתמש ──► 4
         ▼
┌─────────────────┐
│ 5. עדכן MD      │  design-decisions/components/*.md
└─────────────────┘
```

### שלב 1 — קלט

- אם יש קישור Figma — השתמש ב-Figma MCP (`get_design_context`, `get_screenshot`).
- אם אין — בקש specs או צילום לפני קידוד.

### שלב 2 — מיפוי

| Figma | חיפוש בקוד |
|-------|------------|
| Button | `packages/mui-material/src/Button/` |
| Text Field | `packages/mui-material/src/TextField/` |
| Card | `packages/mui-material/src/Card/` |
| Custom | `Glob **/src/<Name>/` |

גלריה: `/material-ui/all-components/` או `packages/mui-material/src/index.js`.

### שלב 3 — השוואה (עצירה)

השווה לפחות:

- מידות (height, padding, border-radius)
- צבעים (מול `theme.palette` / tokens)
- טיפוגרפיה (variant, weight, size)
- מצבים: default, hover, focus, disabled, error
- RTL: כיוון אייקונים, יישור טקסט, padding לוגי

**כל סטייה שדורשת שינוי ב-`packages/mui-material/src/<Component>/`** → עצור. מלא [stop-report-template.md](stop-report-template.md).

**מותר בדף בלי עצירה:** רק `sx` ל-layout (margin, gap, grid) כשהרכיב כבר תואם ויזואלית.

### שלב 4 — בניית דף (אחרי התאמה)

1. צרו **store stub** + **mock service** (ראו [PAGE-TEMPLATE.md](../../../docs/design-team/PAGE-TEMPLATE.md))
2. בנו עמוד עם **4 מצבים**: Loading, Error, Empty, Success
3. רשמו route ב-`src/routes/`

```tsx
import { observer } from 'mobx-react-lite';
import { LoadingState, ErrorState, EmptyState } from '../components/common';
// ...

export default observer(function MyPage() {
  // Page → Store → Service
});
```

- דפים SPA: `src/pages/`
- בדוק **light + dark** (`DesignModeToggle`)

### שלב 5 — תיעוד

עדכן `design-decisions/components/<ComponentName>.md` — גם אם לא שינית קוד (רשום "ללא שינוי — תואם Figma").

---

## מתי לשאול את המשתמש

שאל **לפני** קידוד אם:

- אין התאמה ברורה Figma ↔ רכיב MUI
- שני רכיבים יכולים להתאים (למשל `Chip` vs `Button`)
- הרכיב החדש שייך ל-`material` או `lab`
- יש סתירה בין שני מסכי Figma
- נדרש חריג RTL (`docs/design-system/rtl.md`)

---

## פלטים צפויים

| מצב | פלט |
|-----|-----|
| עצירה | דוח Markdown לפי stop-report-template — **בלי** קוד דף |
| אישור + מימוש | קוד דף RTL + עדכוני רכיב + MD מעודכן |
| רכיב חדש | תיקיית רכיב מלאה + MD + שאלה אם לא בטוח |

---

## קבצים בפרויקט זה

| נושא | נתיב |
|------|------|
| SPA (אפליקציה) | `src/` |
| רכיבי MUI | `packages/mui-material/src/<Component>/` |
| תיעוד רכיב | `design-decisions/components/<Component>.md` |
| מדריכי עיצוב | `docs/design-team/` |
| חוקים כלליים | [DESIGN-TO-CODE.md](../../../DESIGN-TO-CODE.md) |
| RTL חריגים | `docs/design-system/rtl.md` |
| Figma skill | `implement-design` (Figma MCP) |

---

## משאבים

- [component-doc-template.md](component-doc-template.md) — תבנית MD לרכיב
- [stop-report-template.md](stop-report-template.md) — תבנית דוח עצירה
- [reference.md](reference.md) — נתיבים ופקודות
