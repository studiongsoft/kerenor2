# WelcomeCard

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 |
| Figma | — |
| קבצי קוד | `src/components/welcome/WelcomeCard.tsx` |
| סטטוס | שונה בוצע |

## שינויים

### 2026-06-10 — אפקט לחיצה כמו כפתור

- **קבצים:** `WelcomeCard.tsx`
- **מה:** `Paper` + `RouterLink` הוחלף ב-`ButtonBase` + `RouterLink` (TouchRipple מובנה); נוסף `&:active` — `transform: translateY(0)`, `boxShadow: SURFACE_SHADOW`
- **למה:** כרטיסי כניסה בדף הבית צריכים משוב לחיצה כמו `MuiButton` (ripple + שקיעה חזרה מ-hover)
