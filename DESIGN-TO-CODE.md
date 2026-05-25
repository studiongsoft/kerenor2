# מדריך עבודה: מעצבים → קוד

**מקור האמת (קוד + חוקים):** [github.com/studiongsoft/design-lead](https://github.com/studiongsoft/design-lead)

חבילה: `@studiongsoft/design-lead`

---

## התקנה במונורפו זה

```bash
pnpm add github:studiongsoft/design-lead --filter docs
```

או קישור מקומי (אם המאגר ליד התיקייה):

```json
"@studiongsoft/design-lead": "link:../../design-lead"
```

## שימוש

```tsx
import { AppThemeProvider, DesignModeToggle } from '@studiongsoft/design-lead';
```

Playground: `pnpm docs:dev` → `/playground/`

---

## חוקים (תקציר)

1. **RTL תמיד** — `AppThemeProvider`
2. **דפים מרכיבים קיימים** — שינוי רכיב ב-`packages/mui-material/src/` + תיעוד ב-`design-decisions/` (במאגר design-lead או העתקה לפרויקט)
3. **Git** — branch, PR, `git revert`
4. **התנגשות** — `needs-design-approval`
5. **Light + Dark** — `DesignModeToggle`

פרטים מלאים: [DESIGN-TO-CODE.md במאגר design-lead](https://github.com/studiongsoft/design-lead/blob/main/DESIGN-TO-CODE.md)

**הטמעת Figma:** Cursor skill `figma-design-implementation` — עצירה כש-Figma ≠ רכיב, תיעוד ב-`design-decisions/components/`.

---

## אפליקציה (SPA)

```bash
pnpm -F keren-or dev          # http://localhost:5173
pnpm -F keren-or build
```

מדריכי צוות עיצוב: [docs/design-team/README.md](./docs/design-team/README.md)

## MUI docs + playground

- רכיבים: `packages/mui-material/src/<Component>/`
- דמוים: `docs/data/material/components/`
- חריגי RTL מקומיים: `docs/design-system/rtl.md`

```bash
pnpm docs:dev
pnpm docs:create-playground
```
