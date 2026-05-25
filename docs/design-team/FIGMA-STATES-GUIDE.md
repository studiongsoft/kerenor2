# מצבים חובה ב-Figma — לפני handoff

לפני העברת עמוד לקוד, Figma **חייב** לכלול את המצבים הבאים.

---

## לכל עמוד — 4 מצבי מסך

| מצב | תיאור | דוגמה |
|-----|--------|--------|
| **Success / Default** | מסך עם נתונים | טבלה מלאה, טופס מלא |
| **Loading** | טעינה | Skeleton / spinner |
| **Error** | שגיאה | Banner + "נסו שוב" |
| **Empty** | אין נתונים | אייקון + טקסט + CTA |

---

## Light + Dark

- **Light frame** — עיצוב מצב בהיר
- **Dark frame** — עיצוב מצב כהה
- בדקו contrast, borders, shadows במצב כהה

---

## לכל Input / Button

| מצב | חובה |
|-----|------|
| Default | ✓ |
| Hover | ✓ |
| Focus | ✓ |
| Disabled | ✓ |
| Error | ✓ (שדות טופס) |

---

## טפסים

- Empty form (ערכים ריקים)
- Filled form (ערכים תקינים)
- Validation errors (שדות עם שגיאה)
- Submit loading (אם רלוונטי)

---

## טבלאות

- עם נתונים (pagination אם רלוונטי)
- ריקה (Empty state)
- Loading (skeleton rows)
- שגיאה (Error banner)

---

## Dialogs / Modals

- פתוח — default
- עם validation errors
- `dir="rtl"` — יישור נכון

---

## Checklist לפני handoff לקוד

- [ ] Success frame
- [ ] Loading frame
- [ ] Error frame
- [ ] Empty frame
- [ ] Light + Dark
- [ ] כל מצבי input/button
- [ ] RTL — יישור, אייקונים, padding

**אם חסר מצב — בקשו מהמעצב/ת להשלים לפני קידוד.**
