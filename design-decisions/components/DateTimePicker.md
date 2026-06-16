# DateTimePicker

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-15 |
| Figma | [mui-RTL date and time picker 31472:7173](https://www.figma.com/design/moh1a8gUFMkZmkQcFwYey1/mui-RTL?node-id=31472-7173) |
| קוד | `src/components/campaigns/CampaignFormDateTimeField.tsx`, `src/theme/datePickerComponents.ts` |

## התאמה ל-Figma (RTL)

| מאפיין | Figma | יישום |
|--------|-------|--------|
| רוחב popover | 277px | `PICKER_POPOVER_WIDTH` |
| מיקום popover | צמוד לשמאל השדה, 8px למטה | `anchorOrigin`/`transformOrigin` `left` + `PICKER_POPOVER_OFFSET` |
| פינות / צל | 8px, elevation/4 | `Popover` paper + `MuiPickersPopper` |
| חיצי לוח | ימין → חודש קודם, שמאל → חודש הבא | `pickerArrowSlots` |
| לוח שנה | כותרת RTL, year/month/day views, 3 עמודות בשנה | `DateCalendar` + `yearsPerRow={3}` |
| יום נבחר | עיגול primary מלא | `MuiPickersDay` `.Mui-selected` |
| היום | מסגרת primary | `MuiPickersDay-today` |
| שעון | עיגול 220px (ממורכז), מחוג primary, 24 שעות | `TimeClock` `ampm={false}` |
| שנה נבחרת | pill 32px, padding 4×8, ממורכז | `MuiPickersYear.yearButton` |

## שינויים

### 2026-06-15 — שעון 24 שעות, כותרת ודילוג על שעה

- תצוגת יום (שלב ראשון) ללא כפתור חזרה
- שלב שעה: כותרת (תווית השדה), שעון 24 שעות (ללא AM/PM)
- תיבת סימון "כל היום" / "לא משנה" — מדלגת על בחירת שעה ושומרת תאריך בלבד

### 2026-06-15 — ניווט אחורה ותיקון בחירת שנה

- כפתור חזרה בכל שלבי ה-picker מלבד תצוגת יום (שנה / חודש / שעות / דקות)
- בחירת שנה או חודש נשארת בלוח התאריכים; מעבר לשעון רק אחרי בחירת יום (`selectionState === 'finish'`)
- בחירת שנה מחזירה לתצוגת יום בשנה שנבחרה (`onYearChange` → `day`)

### 2026-06-15 — ריווח בין חיצי לוח שנה ולוח ימים

- `MuiPickersArrowSwitcher.spacer` — רוחב 16px (במקום ברירת MUI 24px)
- `MuiDayCalendar.monthContainer` — margin 16px למעלה ולמטה

### 2026-06-15 — כותרת לוח שנה אופקית (RTL)

- חיצים נצמדים לשמאל; תווית חודש/שנה + dropdown נצמדים לימין
- `direction: ltr /* @noflip */` על שורת הכותרת + `order` לסידור אופקי יציב

### 2026-06-11 — יישור picker (מיקום, חיצים, שנה, שעון)

- popover צמוד לשמאל השדה + 8px למטה
- `pickerArrowSlots` — חיצים: ימין=קודם, שמאל=הבא
- כותרת לוח ממורכזת; grid שנה קרוב לתחתית
- pill שנה: 32px, padding 4×8, טקסט ממורכז
- שעון: 220px, AM/PM עם contrast ב-selected, 16px מהקצוות

### 2026-06-11 — Figma mui-RTL pickers

- הוספת `@mui/x-date-pickers` + `dayjs` עם `DatePickersProvider` (locale `he`)
- החלפת native `<input type="date/time">` ב-`DateCalendar` + `TimeClock` בתוך `Popover`
- theme overrides ב-`datePickerComponents.ts` (יום, שנה, שעון, כותרת לוח)

## מצבים שנבדקו

- [ ] Light + RTL
- [ ] Dark + RTL
- [ ] בחירת תאריך → מעבר לשעון → סגירה
