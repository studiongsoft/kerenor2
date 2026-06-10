# EmptyState

> תיעוד שינויי עיצוב/קוד לרכיב. עדכן בכל הטמעת Figma שנוגעת ברכיב זה.

## מטא

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-10 |
| Figma | — |
| קבצי קוד | `src/components/common/EmptyState.tsx`, `src/components/common/emptyStateIcons.ts`, `src/assets/empty-state/light/*.png`, `src/assets/empty-state/dark/*.png` |
| סטטוס | שונה בוצע |

## התאמה ל-Figma

| מאפיין | Figma | קוד נוכחי | פעולה |
|--------|-------|-----------|--------|
| icon size | 64×64 | `EMPTY_STATE_ICON_SIZE = 125` | תואם (+30% מ-96) |
| banks | `bank` illustration | `empty-state/bank.png` | תואם |
| campaigns | `mivza` illustration | `empty-state/mivza.png` | תואם |
| conferences | `veida` illustration | `empty-state/veida.png` | תואם |
| layout | centered column | `alignItems` + `justifyContent` center | תואם |

## שינויים שבוצעו בקוד

### 2026-06-10 — light mode icon opacity

- **קבצים:** `EmptyState.tsx`, `emptyStateIcons.ts`
- **מה:** `opacity: 0.8` לאיורי light mode בלבד
- **למה:** האיורים נראו כהים מדי על רקע בהיר

### 2026-06-10 — light mode transparent backgrounds

- **קבצים:** `src/assets/empty-state/light/*.png`
- **מה:** הסרת רקע אפור/שחור מאיורי light mode
- **למה:** handoff מעיצוב

### 2026-06-10 — dark mode transparent backgrounds

- **קבצים:** `src/assets/empty-state/dark/*.png`
- **מה:** הסרת רקע שחור מאיורי dark mode (light mode נשאר as-is)
- **למה:** handoff מעיצוב

### 2026-06-10 — light/dark asset sets (as-is backgrounds)

- **קבצים:** `src/assets/empty-state/light/*.png`, `src/assets/empty-state/dark/*.png`, `emptyStateIcons.ts`, `EmptyState.tsx`
- **מה:** light mode — איורים עם רקע שקוף; dark mode — איורים ייעודיים עם רקע שקוף; בחירה לפי `useResolvedColorMode()`
- **למה:** handoff מעיצוב

### 2026-06-10 — higher-quality source assets

- **קבצים:** `src/assets/empty-state/*.png`
- **מה:** החלפת איורים בגרסאות HQ (~470×512); תצוגה נשארת 96×96 עם `objectFit: contain`
- **למה:** handoff מעיצוב

### 2026-06-10 — transparent backgrounds + 96px icons

- **קבצים:** `src/assets/empty-state/*.png`, `emptyStateIcons.ts`
- **מה:** הסרת רקע שחור מהאיורים; הגדלת תצוגה ל-96×96 (+50%)
- **למה:** handoff מעיצוב

### 2026-06-10 — per-table empty-state illustrations

- **קבצים:** `EmptyState.tsx`, `emptyStateIcons.ts`, `DataTable.tsx`, `BanksPage.tsx`, `ConferencesPage.tsx`, `PermissionsManagementPage.tsx`
- **מה:** שלושה אייקונים ייעודיים (בנקים / מבצעים / ועידות) בגודל 64×64; `DataTable` מקבל `emptyIcon`
- **למה:** handoff מעיצוב

## מצבים שנבדקו

- [ ] Light + RTL
- [ ] Dark + RTL
- [ ] hover / focus / disabled / error

## הערות

- `icon` prop: `banks` | `campaigns` | `conferences`
- אייקון דקורטיבי — `alt=""` כי הכותרת מספקת הקשר
