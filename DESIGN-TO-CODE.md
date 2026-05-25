# מדריך עבודה: מעצבים → קוד

**מקור האמת:** [github.com/studiongsoft/design-lead](https://github.com/studiongsoft/design-lead)

חבילה: `@studiongsoft/design-lead`

## שימוש

```tsx
import { AppThemeProvider, DesignModeToggle } from '@studiongsoft/design-lead';
```

## חוקים (תקציר)

1. **RTL תמיד** — `AppThemeProvider`
2. **דפים מרכיבים קיימים** — שינוי רכיב ב-`packages/mui-material/src/` + תיעוד ב-`design-decisions/`
3. **Light + Dark** — `DesignModeToggle`
4. **עמודים** — רק ב-`src/pages/`; ללא styling חד-פעמי בדף

פרטים מלאים: [DESIGN-TO-CODE.md במאגר design-lead](https://github.com/studiongsoft/design-lead/blob/main/DESIGN-TO-CODE.md)

## מבנה

| נתיב | תיאור |
|------|--------|
| `src/` | אפליקציית SPA |
| `packages/mui-material/` | רכיבי MUI לעריכה |
| `design-decisions/` | תיעוד שינויים |
| `design-snapshots/` | צילומי light/dark |
| `docs/design-team/` | מדריכי handoff |

## הרצה

```bash
pnpm install
pnpm dev
```

פתחו: `http://localhost:5173/permissions`
