# מדריך בניית עמוד מ-Figma

תהליך צעד-אחר-צעד לכל עמוד חדש.

---

## שלב 1 — קלט

- קבלו **Figma URL** + **node-id**
- ודאו ש-Figma כולל את כל המצבים ([FIGMA-STATES-GUIDE.md](./FIGMA-STATES-GUIDE.md))

---

## שלב 2 — מיפוי רכיבים

| Figma layer | חיפוש בקוד |
|-------------|------------|
| Button | `packages/mui-material/src/Button/` |
| Text Field | `packages/mui-material/src/TextField/` |
| Table | `packages/mui-material/src/Table/` |
| Dialog | `packages/mui-material/src/Dialog/` |
| Custom | `Glob **/src/<Name>/` |

גלריה: `pnpm docs:dev` → `/material-ui/all-components/`

---

## שלב 3 — השוואה

השוו לפחות:

- מידות (height, padding, border-radius)
- צבעים (מול `theme.palette`)
- טיפוגרפיה (variant, weight, size)
- מצבים: default, hover, focus, disabled, error
- RTL: כיוון אייקונים, יישור טקסט

**Figma ≠ רכיב?** → [עצירה](./DESIGN-DEV-CONTRACT.md#כלל-עצירה-stop)

---

## שלב 4 — תשתית עמוד

1. **Types** — `src/types/<feature>.ts`
2. **Mock data** — `src/services/mocks/`
3. **Service interface** — `src/services/<feature>Service.ts`
4. **Store stub** — `src/stores/<Feature>Store.ts`
5. **Utils** (אם נדרש) — `src/utils/`

---

## שלב 5 — בניית UI

1. העתיקו תבנית מ-[PAGE-TEMPLATE.md](./PAGE-TEMPLATE.md)
2. צרו קומפוננטות ב-`src/components/<feature>/`
3. צרו עמוד ב-`src/pages/<Feature>Page.tsx`
4. מימוש **4 מצבים**:
   - `LoadingState` — בטעינה
   - `ErrorState` — שגיאה + retry
   - `EmptyState` — אין נתונים
   - Success — UI מ-Figma

---

## שלב 6 — Route

רשמו ב-`src/routes/index.tsx`:

```tsx
<Route path="/my-page" element={<MyFeaturePage />} />
```

---

## שלב 7 — בדיקה

```bash
pnpm dev
```

- [ ] Light mode
- [ ] Dark mode (`DesignModeToggle`)
- [ ] RTL
- [ ] Loading (`VITE_MOCK_API_DELAY=1000` ב-.env)
- [ ] Error (`VITE_MOCK_API_ERROR=true` ב-.env)
- [ ] Empty (mock data ריק)

---

## שלב 8 — תיעוד

1. עדכנו `design-decisions/components/<Name>.md` לכל רכיב
2. מלאו [PAGE-CHECKLIST.md](./PAGE-CHECKLIST.md)
3. פתחו PR

---

## פקודות

```bash
pnpm dev          # SPA
pnpm docs:dev                 # גלריית רכיבים
pnpm prettier                 # פורמט
pnpm eslint                   # lint
pnpm typescript   # type check
```
