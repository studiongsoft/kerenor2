# ColorModeToggle

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 (size −15%) |
| קוד | `src/components/layout/ColorModeToggle.tsx` |

## התאמה ל-Figma (RTL)

| מאפיין | Figma | יישום |
|--------|-------|--------|
| צורה | pill מחולק לשניים, `96×36px`, `border-radius: 18px` | `TOGGLE_WIDTH` / `TOGGLE_HEIGHT` |
| מסגרת | `#00838F` | `TOGGLE_COLORS.border` |
| סדר | שמש (בהיר) \| ירח (כהה), LTR קבוע | `flexDirection: 'row /* @noflip */'` |
| בהיר פעיל | רקע לבן, אייקון `#707070` | מצב `light` |
| בהיר לא פעיל | רקע `#2B2B2B`, אייקון 45% לבן | מצב `dark` |
| כהה פעיל | רקע `#232323`, אייקון `#00BCD4` | מצב `dark` |
| כהה לא פעיל | רקע `#232323`, אייקון `#00ACC1` | מצב `light` |
| הפעלה | `useColorScheme().setMode` | MUI color schemes |

## שינויים

### 2026-06-10 — הקטנת גודל 15%

- **קבצים:** `ColorModeToggle.tsx`
- **מה:** `TOGGLE_WIDTH` 112 → 95.2, `TOGGLE_HEIGHT` 44 → 37.4
- **למה:** התאמת גודל ה-toggle בסרגל הצד

### 2026-06-10 — מצב כהה + עיצוב מחדש

- תוקן מיפוי אייקונים: שמש = בהיר, ירח = כהה
- צבעי מקטעים לפי צילומי Figma (כהה / בהיר)
- `@noflip` על כיוון ה-pill כדי לשמור סדר שמש-ירח ב-RTL
