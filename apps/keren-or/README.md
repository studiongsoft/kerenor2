# keren-or — SPA

אפליקציית React SPA לפרויקט קרן אור. נקודת הכניסה ל-handoff לצוות הפיתוח.

## הרצה

```bash
pnpm install
pnpm -F keren-or dev       # http://localhost:5173
pnpm -F keren-or build     # production build → dist/
pnpm -F keren-or typescript
```

## Environment

העתיקו `.env.example` ל-`.env`:

| משתנה | תיאור |
|--------|--------|
| `VITE_API_BASE_URL` | Base URL ל-API (ברירת מחדל: `http://localhost:3000/api`) |
| `VITE_MOCK_API_ERROR` | `true` — מדמה שגיאת API (לבדיקת Error state) |
| `VITE_MOCK_API_DELAY` | השהייה במילישניות ל-mock calls (לבדיקת Loading) |

## ארכיטקטורה

```
src/
├── pages/          ← UI עמודים (צוות עיצוב)
├── components/     ← קומפוננטות משותפות + feature
├── stores/         ← MobX stores
├── services/       ← Axios + mock/real API
├── routes/         ← React Router
├── theme/          ← MUI Theme + AppThemeProvider (RTL)
├── types/          ← TypeScript interfaces
├── utils/          ← פונקציות עזר
└── assets/         ← תמונות, אייקונים, משאבים גרפיים
```

**זרימת נתונים:** `Page → Store → Service → API`

## Routes

| Path | עמוד |
|------|------|
| `/` | redirect → `/permissions` |
| `/permissions` | ניהול מבצעים / הרשאות |

## Handoff לפיתוח

### מה מוכן

- UI מלא עם Loading / Error / Empty / Success
- MobX stores עם mock data
- Service interfaces (`campaignService.ts`)
- Axios client (`apiClient.ts`)
- ErrorBoundary, Snackbar, Theme (RTL + light/dark)
- React Hook Form + Zod לטפסים

### מה פיתוח מחליף

| קובץ | פעולה |
|------|--------|
| `services/campaignService.ts` | mock → `apiClient.get/post/delete` |
| `stores/CampaignStore.ts` | הוספת לוגיקה עסקית, computed, side effects |
| `routes/index.tsx` | auth guards, lazy loading |
| `.env` | production values |

**UI לא צריך להשתנות** — רק service layer ו-store logic.

### דוגמה: mock → API

```typescript
// לפני (עיצוב)
export async function fetchCampaigns() {
  return withMockDelay([...MOCK_CAMPAIGNS]);
}

// אחרי (פיתוח)
export async function fetchCampaigns() {
  const { data } = await apiClient.get<CampaignRowData[]>('/campaigns');
  return data;
}
```

## MUI Monorepo

האפליקציה משתמשת ברכיבי MUI מה-workspace (`packages/mui-material/`).

לפני build ראשון, ודאו ש-packages בנויים:

```bash
pnpm -F @mui/types build
pnpm -F @mui/utils build
pnpm -F @mui/styled-engine build
pnpm -F @mui/system build
pnpm -F @mui/material build
pnpm -F @mui/private-theming build
```

## מדריכים לצוות עיצוב

ראו [docs/design-team/](../../docs/design-team/README.md)
