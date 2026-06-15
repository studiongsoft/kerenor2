import { useCallback, useEffect, useRef, useState } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs, { type Dayjs } from 'dayjs';
import {
  formatDateTimeField,
  formatDisplayDate,
  isoDateFromDisplay,
} from '../../utils/campaignFormLogic';
import { rtlTextSx } from '../../theme/rtlLayout';
import {
  PICKER_POPOVER_OFFSET,
  PICKER_POPOVER_WIDTH,
  pickerArrowSlots,
} from '../../theme/datePickerComponents';
import { POPUP_SHADOW } from '../../theme/createKerenOrTheme';

interface CampaignFormDateTimeFieldProps {
  label: string;
  required?: boolean;
  date: string;
  time: string;
  onDateChange: (displayDate: string) => void;
  onTimeChange: (time: string) => void;
  error?: boolean;
  helperText?: string;
}

type PickerStep = 'date' | 'time';

function toPickerValue(date: string, time: string): Dayjs | null {
  const iso = isoDateFromDisplay(date);
  if (!iso) {
    return null;
  }

  const [hours = 0, minutes = 0] = (time || '00:00').split(':').map(Number);
  return dayjs(iso).hour(hours).minute(minutes).second(0).millisecond(0);
}

export function CampaignFormDateTimeField({
  label,
  required = false,
  date,
  time,
  onDateChange,
  onTimeChange,
  error,
  helperText,
}: CampaignFormDateTimeFieldProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [step, setStep] = useState<PickerStep>('date');
  const [pickerValue, setPickerValue] = useState<Dayjs | null>(() => toPickerValue(date, time));
  const [timeView, setTimeView] = useState<'hours' | 'minutes'>('hours');

  const handleTimeViewChange = useCallback((view: 'hours' | 'minutes' | 'seconds') => {
    if (view === 'hours' || view === 'minutes') {
      setTimeView(view);
    }
  }, []);

  useEffect(() => {
    setPickerValue(toPickerValue(date, time));
  }, [date, time]);

  const closePicker = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openPicker = useCallback(() => {
    setAnchorEl(anchorRef.current);
    setStep('date');
    setTimeView('hours');
    setPickerValue(toPickerValue(date, time) ?? dayjs());
  }, [date, time]);

  const handleDateChange = useCallback(
    (newDate: Dayjs | null) => {
      if (!newDate) {
        return;
      }

      const nextValue = newDate
        .hour(pickerValue?.hour() ?? 0)
        .minute(pickerValue?.minute() ?? 0)
        .second(0)
        .millisecond(0);

      onDateChange(formatDisplayDate(nextValue.format('YYYY-MM-DD')));
      setPickerValue(nextValue);
      setStep('time');
      setTimeView('hours');
    },
    [onDateChange, pickerValue],
  );

  const handleTimeChange = useCallback(
    (newTime: Dayjs | null) => {
      if (!newTime) {
        return;
      }

      const baseDate = pickerValue ?? dayjs();
      const nextValue = baseDate
        .hour(newTime.hour())
        .minute(newTime.minute())
        .second(0)
        .millisecond(0);

      setPickerValue(nextValue);
      onTimeChange(nextValue.format('HH:mm'));

      if (timeView === 'minutes') {
        closePicker();
      }
    },
    [closePicker, onTimeChange, pickerValue, timeView],
  );

  return (
    <>
      <Box ref={anchorRef} sx={{ width: '100%' }}>
        <TextField
          label={label}
          required={required}
          fullWidth
          value={formatDateTimeField(date, time)}
          placeholder="DD/MM/YYYY | HH:MM"
          error={error}
          helperText={helperText}
          onClick={openPicker}
          slotProps={{
            input: {
              readOnly: true,
              sx: rtlTextSx,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={`בחירת ${label}`}
                    edge="end"
                    onClick={(event) => {
                      event.stopPropagation();
                      openPicker();
                    }}
                    size="small"
                  >
                    <CalendarTodayOutlinedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
            inputLabel: { sx: rtlTextSx },
          }}
        />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePicker}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        dir="rtl"
        slotProps={{
          paper: {
            sx: {
              width: PICKER_POPOVER_WIDTH,
              maxWidth: PICKER_POPOVER_WIDTH,
              marginTop: `${PICKER_POPOVER_OFFSET}px`,
              borderRadius: '8px',
              boxShadow: POPUP_SHADOW,
              overflow: 'hidden',
            },
          },
        }}
      >
        {step === 'date' ? (
          <DateCalendar
            value={pickerValue}
            onChange={handleDateChange}
            views={['year', 'month', 'day']}
            openTo="day"
            yearsPerRow={3}
            slots={pickerArrowSlots}
          />
        ) : (
          <TimeClock
            ampm
            ampmInClock
            value={pickerValue}
            view={timeView}
            onViewChange={handleTimeViewChange}
            onChange={handleTimeChange}
            slots={pickerArrowSlots}
          />
        )}
      </Popover>
    </>
  );
}
