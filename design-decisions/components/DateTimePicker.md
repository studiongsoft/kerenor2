# DateTimePicker

| שדה | ערך |
|-----|-----|
| עדכון אחרון | 2026-06-11 |
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
| שעון | עיגול 220px (ממורכז), מחוג primary, AM/PM 16px מהקצוות | `TimeClock` + `MuiClock` overrides |
| שנה נבחרת | pill 32px, padding 4×8, ממורכז | `MuiPickersYear.yearButton` |

## שינויים

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
