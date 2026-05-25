# צ'קליסט — לפני handoff / PR

העתיקו לתיאור ה-PR וסמנו ✓.

---

## עמוד: _______________

**Figma:** _______________

---

### RTL + Theme

- [ ] `dir="rtl"` + `lang="he"` (דרך `AppThemeProvider`)
- [ ] Light mode נבדק
- [ ] Dark mode נבדק
- [ ] אין hex קשיח בדף — רק `theme.palette` / `theme.spacing`

### מצבי UI (חובה)

- [ ] **Loading** — `LoadingState` או skeleton
- [ ] **Error** — `ErrorState` + כפתור retry
- [ ] **Empty** — `EmptyState` עם הודעה מתאימה
- [ ] **Success** — UI תואם Figma

### ארכיטקטורה

- [ ] UI ב-`pages/` + `components/` — הרכבה בלבד
- [ ] State ב-MobX store — לא `useState` לנתוני עמוד
- [ ] Mock service ב-`services/` — לא axios ישיר מה-UI
- [ ] Route רשום ב-`src/routes/`
- [ ] טופס (אם יש) — React Hook Form + Zod

### רכיבים

- [ ] לא override רכיב בדף (`styled`, `theme.components` בדף)
- [ ] שינויי רכיב ב-`packages/mui-material/src/` + MD
- [ ] `design-decisions/components/*.md` מעודכן

### Figma

- [ ] קישור Figma ב-header של קובץ העמוד
- [ ] כל המצבים מ-Figma מיושמים

### Responsive

- [ ] Desktop נבדק
- [ ] Portals (`Dialog`, `Menu`) עם `dir="rtl"`

---

**ממלא/ת:** _______________  
**תאריך:** _______________
