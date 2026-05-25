# kerenor

ממשק **ניהול מבצעים / הקצאת ועידות** לפרויקט קרן אור — RTL, [design-lead](https://github.com/studiongsoft/design-lead), Material UI.

## דרישות

- Node.js 20+
- pnpm 10+

## התקנה והרצה

```bash
git clone https://github.com/studiongsoft/kerenor.git
cd kerenor
pnpm install
pnpm dev
```

פתחו: [http://localhost:5173/permissions](http://localhost:5173/permissions)

> **הערה:** `@studiongsoft/design-lead` נטען מ-GitHub. לפיתוח מקומי: `"@studiongsoft/design-lead": "file:../design-lead"` ב-`package.json`.

## מבנה

```
kerenor/
├── src/                    ← אפליקציית React SPA
│   ├── pages/
│   ├── components/
│   ├── stores/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── theme/
│   ├── routes/
│   └── assets/
├── packages/mui-material/  ← Design System — שינוי רכיבים כאן
├── design-decisions/       ← תיעוד החלטות עיצוב
├── design-snapshots/       ← צילומי light/dark
└── docs/design-team/       ← מדריכים וחוזה handoff
```

**זרימת נתונים:** `Page → Store → Service → API`

## Environment

העתיקו `.env.example` ל-`.env`:

| משתנה | תיאור |
|--------|--------|
| `VITE_API_BASE_URL` | Base URL ל-API |
| `VITE_MOCK_API_ERROR` | `true` — מדמה שגיאת API |
| `VITE_MOCK_API_DELAY` | השהייה במילישניות ל-mock calls |

## Scripts

| פקודה | תיאור |
|--------|--------|
| `pnpm dev` | dev server (Vite) |
| `pnpm build` | production build → `dist/` |
| `pnpm typescript` | type check |
| `pnpm build:packages` | build MUI workspace packages |

## Handoff לפיתוח

- UI מלא: Loading / Error / Empty / Success
- MobX stores + mock services
- ErrorBoundary, Snackbar, Theme (RTL + light/dark)
- React Hook Form + Zod

**פיתוח מחליף:** `services/*` (mock → API), לוגיקה ב-stores, auth ב-routes. **UI לא צריך להשתנות.**

מדריכים: [docs/design-team/README.md](./docs/design-team/README.md)

## רישיון

פרטי — Studio NG Soft
