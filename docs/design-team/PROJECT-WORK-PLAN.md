# תוכנית עבודה — פרויקט קרן אור (SPA)

מסמך זה מגדיר את **מבנה הפרויקט, האחריות, והתוצר** שצוות העיצוב בונה ומעביר לצוות הפיתוח.
הפרויקט נבנה כ-**Single Page Application** חדש, עם הפרדה ברורה בין שכבות UI, State, ו-API.

---

## 1. מטרת הפרויקט

| צוות | תפקיד | תוצר |
|------|--------|------|
| **עיצוב** | הטמעת מסכים מ-Figma לקוד, תחזוקת Design System, תיעוד רכיבים | UI מלא, mock data, עמודים עם כל המצבים |
| **פיתוח** | חיבור ל-Backend, לוגיקה עסקית, auth, production | החלפת mocks ב-API אמיתי, השלמת stores |

**עקרון מרכזי:** צוות העיצוב מספק **ממשק משתמש מוכן להמשך פיתוח**. צוות הפיתוח מקבל קוד עם ארכיטקטורה מוכנה — ולא צריך לבנות UI מאפס.

---

## 1.1 מבנה התוצר — סטטוס handoff

| אזור | תפקיד | סטטוס |
|------|--------|--------|
| `apps/keren-or/src/pages/` | מסכי המערכת | **מוכן** |
| `apps/keren-or/src/components/` | רכיבי UI משותפים וייעודיים | **מוכן** |
| `apps/keren-or/src/stores/` | ניהול מצב + mock data | **מוכן** |
| `apps/keren-or/src/services/` | שכבת API mock | **מוכן** |
| `apps/keren-or/src/types/` | TypeScript types | **מוכן** |
| `apps/keren-or/src/routes/` | ניווט | **מוכן** |
| `apps/keren-or/src/theme/` | RTL + light/dark | **מוכן** |
| `apps/keren-or/src/assets/` | משאבים גרפיים | **מוכן** (placeholder) |
| `design-decisions/` | תיעוד רכיבים | **מוכן** |
| `design-snapshots/` | צילומי בדיקה | **מוכן** (`permissions/` light + dark) |
| `apps/keren-or/README.md` | הנחיות handoff | **מוכן** |

---

## 2. סטack טכנולוגי

### חובה

| טכנולוגיה | שימוש |
|-----------|--------|
| **React** | UI framework |
| **TypeScript + TSX** | כל קומפוננטות UI ב-TSX בלבד |
| **Material UI (MUI)** | ספריית עיצוב — Theme, רכיבים, responsive |
| **MobX** | ניהול State — stores נפרדים מ-UI |
| **React Router** | ניווט client-side |
| **Axios** | קריאות API (שכבת services) |
| **Vite** | Build tool + dev server |
| **ESLint + Prettier** | איכות וקונסיסטנטיות קוד |

### מומלץ

| טכנולוגיה | שימוש |
|-----------|--------|
| **React Hook Form** | טפסים |
| **Zod** | ולידציה (schemas) |
| **Snackbar / Toast** | הודעות מערכת |
| **Dark / Light Mode** | דרך Theme מרכזי |
| **@studiongsoft/design-lead** | RTL, Theme, `AppThemeProvider` |

---

## 3. מבנה Monorepo

הפרויקט הוא monorepo עם שני אזורים עיקריים:

```
keren-or/
├── apps/keren-or/              ← האפליקציה (SPA) — נקודת כניסה לפיתוח
├── packages/mui-material/      ← Design System — רכיבי MUI מותאמים
├── design-decisions/           ← תיעוד שינויי רכיבים
├── design-snapshots/           ← צילומי light/dark/RTL
└── docs/design-team/           ← מדריכים וחוזה לצוות עיצוב (מסמך זה)
```

---

## 4. מבנה האפליקציה (`apps/keren-or`)

```
apps/keren-or/
├── src/
│   ├── main.tsx                # Bootstrap: Theme + Router + ErrorBoundary
│   ├── App.tsx
│   ├── components/             # קומפוננטות משותפות וספציפיות לעמוד
│   │   ├── common/             # LoadingState, ErrorState, EmptyState, AppSnackbar
│   │   └── [feature]/          # קומפוננטות לפי תחום (למשל campaigns/)
│   ├── pages/                  # עמודים — צוות העיצוב בונה כאן
│   ├── stores/                 # MobX stores
│   ├── services/               # Axios client + mock/real implementations
│   │   └── mocks/              # Mock data לתקופת העיצוב
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript interfaces
│   ├── utils/                  # פונקציות עזר (sort, filter, format)
│   ├── theme/                  # MUI Theme + AppThemeProvider
│   ├── routes/                 # React Router configuration
│   └── assets/                 # תמונות, אייקונים
├── .env.example                # VITE_API_BASE_URL
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### כללי שכבות

```
┌─────────────────────────────────────────┐
│  pages/ + components/     ← UI בלבד     │
├─────────────────────────────────────────┤
│  stores/ (MobX)           ← State       │
├─────────────────────────────────────────┤
│  services/ (Axios)        ← API / Mock  │
├─────────────────────────────────────────┤
│  types/ + utils/          ← Shared      │
└─────────────────────────────────────────┘
```

**זרימת נתונים:** `Page → Store → Service → API`

- קומפוננטות **לא** קוראות ל-Axios ישירות
- Stores **לא** מכילים JSX
- Services **לא** מכילים לוגיקת UI

---

## 5. תשתית חובה באפליקציה

כל פרויקט חדש כולל מההתחלה:

| רכיב | מיקום | תפקיד |
|------|--------|--------|
| **AppErrorBoundary** | `components/common/` | תפיסת שגיאות React ברמת האפליקציה |
| **SnackbarProvider** | `components/common/` | הודעות מערכת (הצלחה, שגיאה, מידע) |
| **LoadingState** | `components/common/` | מצב טעינה — skeleton / spinner |
| **ErrorState** | `components/common/` | מצב שגיאה + כפתור retry |
| **EmptyState** | `components/common/` | מצב ריק — "אין נתונים" |
| **apiClient** | `services/apiClient.ts` | Axios instance, interceptors, timeout |
| **Theme** | `theme/` | MUI Theme מרכזי — צבעים, typography, spacing, breakpoints |
| **.env.example** | root | `VITE_API_BASE_URL` |

---

## 6. Theme, RTL, Light/Dark

### Theme מרכזי

- כל הצבעים, פונטים, spacing ו-breakpoints מוגדרים ב-`theme/`
- שימוש ב-`theme.palette`, `theme.spacing()` — **לא** hex קשיח בדפים
- `colorSchemes: { light: true, dark: true }` — תמיכה בשני מצבים

### RTL

- האפליקציה עטופה ב-`AppThemeProvider` מ-`@studiongsoft/design-lead`
- `createTheme({ direction: 'rtl' })` + stylis RTL
- שורש תוכן: `dir="rtl"`, `lang="he"`
- Portals (`Dialog`, `Modal`, `Menu`, `Popover`) — `dir="rtl"` על הרכיב

### בדיקה

- כל עמוד נבדק ב-**Light + Dark + RTL**
- `DesignModeToggle` זמין בסביבת פיתוח

---

## 7. אחריות צוות העיצוב

### 7.1 מה המעצבים **כן** עושים

| משימה | פירוט |
|--------|--------|
| **הטמעת עמודים מ-Figma** | בניית UI ב-`src/pages/` — הרכבה מרכיבים קיימים |
| **קומפוננטות עמוד** | יצירת קומפוננטות ספציפיות ב-`src/components/[feature]/` |
| **שינוי רכיבי MUI** | התאמת מראה ב-`packages/mui-material/src/<Component>/` + תיעוד |
| **Theme tokens** | צבעים, typography, spacing, component overrides |
| **Mock stores** | MobX store עם mock data לתצוגת UI |
| **Mock services** | Interface + mock implementation ב-`services/mocks/` |
| **4 מצבי UI** | Loading, Error, Empty, Success — בכל עמוד |
| **טפסים** | React Hook Form + Zod schema |
| **תיעוד** | `design-decisions/components/<Name>.md` לכל רכיב שנגעו בו |
| **Routes** | רישום route חדש ב-`src/routes/` |

### 7.2 מה המעצבים **לא** עושים

| אסור | למה |
|------|-----|
| קריאות Axios ישירות מקומפוננטה | שובר הפרדת שכבות |
| `styled()` / override theme בדף | שינוי מראה שייך לרכיב או theme |
| Hex colors קשיחים בדף | חייבים לבוא מ-theme |
| `dir="ltr"` על containers | האפליקציה RTL |
| לוגיקה עסקית ב-UI | שייכת ל-store |
| דילוג על מצבי Loading/Error/Empty | פיתוח צריך את כל המצבים |
| קוד דף כש-Figma ≠ רכיב | עצירה + דוח שינוי רכיב |

### 7.3 תהליך עבודה לעמוד חדש

```
Figma URL
    ↓
1. מיפוי רכיבים (Figma → MUI)
    ↓
2. השוואה (tokens, states, RTL)
    ↓
   Figma = רכיב? ──לא──→ STOP + דוח שינוי רכיב
    │                           ↓
   כן                    אישור Design Lead
    ↓                           ↓
3. יצירת types + mock service + store stub
    ↓
4. בניית עמוד — 4 מצבים (Loading, Error, Empty, Success)
    ↓
5. רישום route
    ↓
6. בדיקת Light + Dark + RTL
    ↓
7. עדכון design-decisions
    ↓
8. מילוי PAGE-CHECKLIST → PR
```

### 7.4 מצבים חובה ב-Figma (לפני handoff)

לכל עמוד, Figma חייב לכלול:

| מצב | תיאור |
|-----|--------|
| **Success / Default** | מסך עם נתונים |
| **Loading** | Skeleton או spinner |
| **Error** | הודעת שגיאה + retry |
| **Empty** | "אין נתונים" + CTA אם רלוונטי |
| **Light frame** | עיצוב מצב בהיר |
| **Dark frame** | עיצוב מצב כהה |

לכל input/button:

| מצב | חובה |
|-----|------|
| Default | כן |
| Hover | כן |
| Focus | כן |
| Disabled | כן |
| Error | כן (לשדות טופס) |

### 7.5 כלל עצירה (STOP)

**אם העיצוב ב-Figma לא תואם לרכיב בקוד — עוצרים.**

- לא בונים override בדף
- ממלאים דוח שינוי רכיב (מה Figma דורש, מה הקוד מציג, מה צריך לשנות)
- ממתינים לאישור Design Lead
- רק אחרי התאמת הרכיב — ממשיכים לבניית העמוד

### 7.6 צ'קליסט לפני handoff (כל PR)

- [ ] RTL + `lang="he"`
- [ ] Light + Dark נבדקו
- [ ] Loading state מיושם
- [ ] Error state + retry מיושם
- [ ] Empty state מיושם
- [ ] Responsive desktop
- [ ] אין hex קשיח / override רכיב בדף
- [ ] Store stub + mock service (לא axios ישיר מה-UI)
- [ ] Route רשום ב-`src/routes/`
- [ ] `design-decisions/components/*.md` מעודכן
- [ ] קישור Figma ב-header של קובץ העמוד
- [ ] טפסים עם React Hook Form + Zod (אם יש טופס)

---

## 8. אחריות צוות הפיתוח

| משימה | פירוט |
|--------|--------|
| **חיבור API** | החלפת mock services ב-axios calls אמיתיים |
| **Store logic** | לוגיקה עסקית, computed values, side effects |
| **Authentication** | Guards על routes, token management |
| **Environment** | `.env` production, CI/CD |
| **Error handling** | טיפול בשגיאות שרת, retry policies |
| **Testing** | Unit, integration, e2e |
| **Performance** | Lazy loading routes, code splitting |

**פיתוח לא נוגע ב-UI** אלא אם יש באג ויזואלי שדורש שינוי ברכיב (דרך design-decisions).

---

## 9. התוצר שצוות הפיתוח מקבל

### 9.1 מה כלול ב-handoff

```
apps/keren-or/                          ← אפליקציה runnable
├── src/
│   ├── pages/                          ← עמודים מוכנים עם 4 מצבים
│   ├── components/                     ← קומפוננטות UI
│   ├── stores/                         ← MobX stores (mock — מוכנים לחיבור)
│   ├── services/
│   │   ├── apiClient.ts                ← Axios instance מוכן
│   │   ├── mocks/                      ← Mock data (להחלפה)
│   │   └── [feature]Service.ts         ← Interface + mock impl
│   ├── types/                          ← TypeScript types (UI + API shapes)
│   ├── routes/                         ← React Router config
│   ├── theme/                          ← Theme מלא
│   └── assets/                         ← תמונות, אייקונים
├── .env.example
└── README.md                           ← מדריך handoff

packages/mui-material/                  ← Design System מותאם
design-decisions/                       ← תיעוד כל שינוי רכיב
design-snapshots/                       ← צילומי light/dark/RTL
└── permissions/                        ← 2026-05-25 light + dark
```

### 9.2 מה הפיתוח צריך לעשות (ולא מקבל מוכן)

| נושא | מצב ב-handoff | מה פיתוח עושה |
|------|---------------|---------------|
| API calls | Mock services | מחליף implementation ב-`services/` |
| Business logic | Store stubs | ממלא stores בלוגיקה אמיתית |
| Auth | לא קיים | מוסיף auth layer + route guards |
| Env vars | `.env.example` | יוצר `.env` production |
| Tests | לא קיים | כותב test suite |
| CI/CD | לא קיים | מגדיר pipeline |

### 9.3 דוגמה: החלפת mock ב-API אמיתי

**לפני (עיצוב):**

```typescript
// services/mocks/campaignMockData.ts
export const MOCK_CAMPAIGNS: Campaign[] = [ ... ];

// services/campaignService.ts
export async function fetchCampaigns(): Promise<Campaign[]> {
  return MOCK_CAMPAIGNS; // mock
}
```

**אחרי (פיתוח):**

```typescript
// services/campaignService.ts
export async function fetchCampaigns(): Promise<Campaign[]> {
  const { data } = await apiClient.get<Campaign[]>('/campaigns');
  return data;
}
```

**UI לא משתנה** — רק ה-service implementation.

### 9.4 קriterions ל-handoff מוצלח

- [x] `pnpm -F keren-or dev` — האפליקציה רצה
- [x] `pnpm -F keren-or build` — build עובר
- [x] כל עמוד עם 4 מצבים (Loading, Error, Empty, Success)
- [x] כל route רשום ונגיש
- [x] Theme: Light + Dark + RTL
- [x] ErrorBoundary ברמת root
- [x] Snackbar provider פעיל
- [x] `.env.example` מתועד
- [x] `apps/keren-or/README.md` — מדריך handoff
- [x] `design-decisions/` מעודכן לכל רכיב
- [x] `design-snapshots/permissions/` — light + dark
- [x] `apps/keren-or/src/assets/` — תיקיית משאבים

---

## 10. Design System (`packages/mui-material`)

### עקרון

- **דפים מרכיבים רכיבים קיימים** — לא מעתיקים קוד רכיב לדף
- **שינוי מראה = שינוי ברכיב** ב-`packages/mui-material/src/<Component>/`
- **כל שינוי מתועד** ב-`design-decisions/components/<Component>.md`

### מבנה רכיב

```
packages/mui-material/src/Button/
├── Button.tsx
├── Button.d.ts
├── Button.test.js
├── buttonClasses.ts
└── index.ts
```

### מה מותר בדף

- `Box`, `Stack`, `Grid`, `Container` — layout
- `sx` ל-spacing, margin, gap — **לא** למראה קבוע של רכיב
- ייבוא one-level deep: `@mui/material/Button`

### מה אסור בדף

- העתקת קוד מ-`packages/mui-material/src/` לדף
- `styled()` שמחליף רכיב MUI
- Override של `theme.components` מתוך דף

---

## 11. MobX — דפוס עבודה

### Store (עיצוב — stub)

```typescript
// stores/CampaignStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchCampaigns } from '../services/campaignService';
import type { Campaign } from '../types/campaign';

export class CampaignStore {
  campaigns: Campaign[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCampaigns() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchCampaigns();
      runInAction(() => {
        this.campaigns = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = 'שגיאה בטעינת מבצעים';
        this.isLoading = false;
      });
    }
  }
}
```

### Page (עיצוב — UI)

```typescript
// pages/CampaignsPage.tsx
import { observer } from 'mobx-react-lite';
import { useCampaignStore } from '../stores/rootStore';
import { LoadingState, ErrorState, EmptyState } from '../components/common';

export default observer(function CampaignsPage() {
  const store = useCampaignStore();

  if (store.isLoading) return <LoadingState />;
  if (store.error) return <ErrorState message={store.error} onRetry={() => store.loadCampaigns()} />;
  if (store.campaigns.length === 0) return <EmptyState title="אין מבצעים" />;

  return ( /* UI */ );
});
```

---

## 12. טפסים — React Hook Form + Zod

```typescript
// types/campaignFormSchema.ts
import { z } from 'zod';

export const campaignFormSchema = z.object({
  name: z.string().min(1, 'שם המבצע חובה'),
  startDate: z.string().min(1, 'תאריך התחלה חובה'),
  endDate: z.string().min(1, 'תאריך סיום חובה'),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
```

```typescript
// components/campaigns/CampaignFormDialog.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
```

---

## 13. פקודות

```bash
# התקנה
pnpm install

# הרצת האפליקציה (SPA)
pnpm -F keren-or dev

# Build production
pnpm -F keren-or build

# MUI component demos (Design System)
pnpm docs:dev

# איכות קוד
pnpm eslint
pnpm prettier
pnpm typescript
```

---

## 14. שלבי הקמת הפרויקט

| שלב | תיאור | אחראי |
|-----|--------|--------|
| **1. Scaffold** | יצירת `apps/keren-or` — Vite, dependencies, workspace config | עיצוב + פיתוח |
| **2. Infrastructure** | ErrorBoundary, Snackbar, Loading/Error/Empty, apiClient, theme | עיצוב |
| **3. Reference Page** | עמוד ייחוס ראשון עם 4 מצבים, store stub, mock service, form | עיצוב |
| **4. Documentation** | מסמכי חוזה, מדריכים, checklists, Cursor rules | עיצוב |
| **5. Handoff** | README, `.env.example`, בדיקת criteria | עיצוב → פיתוח |
| **6. API Integration** | החלפת mocks, store logic, auth | פיתוח |
| **7. New Pages** | עמודים נוספים מ-Figma לפי PAGE-BUILD-GUIDE | עיצוב (מתמשך) |

---

## 15. מסמכים נלווים (ייווצרו)

| מסמך | תוכן |
|------|-------|
| `DESIGN-DEV-CONTRACT.md` | חוזה מפורט — מותר/אסור |
| `PAGE-BUILD-GUIDE.md` | מדריך צעד-אחר-צעד לעמוד חדש |
| `PAGE-CHECKLIST.md` | צ'קליסט copy-paste לכל PR |
| `PAGE-TEMPLATE.md` | תבנית קוד לעמוד חדש |
| `FIGMA-STATES-GUIDE.md` | מצבים חובה ב-Figma |
| `apps/keren-or/README.md` | מדריך handoff לפיתוח |

---

## 16. החלטות ארכיטектוניות

| נושא | החלטה | הערה |
|------|--------|------|
| **design-lead** | נשמר | RTL + Theme + Light/Dark — עומד בדרישת MUI Theme |
| **Monorepo** | MUI packages + SPA app | פיתוח מקבל `apps/keren-or` כ-entry point |
| **Mock → Real** | עיצוב: mocks / פיתוח: API | UI לא משתנה — רק service layer |
| **State** | MobX stores | לא useState לנתוני עמוד |
| **Routing** | React Router | לא Next.js file routing |
| **Forms** | React Hook Form + Zod | לא state מקומי לטפסים |

---

## 17. סיכום

**צוות העיצוב** בונה SPA מלא עם:
- UI מ-Figma (כל המצבים)
- Design System מותאם
- Mock data + store stubs
- תיעוד מלא

**צוות הפיתוח** מקבל:
- אפליקציה runnable עם ארכיטектורה מוכנה
- Interfaces ברורים ל-services ו-stores
- `.env.example` + README
- ומחליף mocks ב-API אמיתי **בלי לגעת ב-UI**
