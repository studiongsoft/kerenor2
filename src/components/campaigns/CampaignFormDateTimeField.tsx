import { useCallback, useEffect, useRef, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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
  /** Label for skipping time — e.g. "כל היום" (start) or "לא משנה" (end). */
  skipTimeLabel: string;
  onDateChange: (displayDate: string) => void;
  onTimeChange: (time: string) => void;
  error?: boolean;
  helperText?: string;
}

type PickerStep = 'date' | 'time';
type DateView = 'year' | 'month' | 'day';
type PickerSelectionState = 'partial' | 'finish';

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
  skipTimeLabel,
  onDateChange,
  onTimeChange,
  error,
  helperText,
}: CampaignFormDateTimeFieldProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [step, setStep] = useState<PickerStep>('date');
  const [dateView, setDateView] = useState<DateView>('day');
  const [pickerValue, setPickerValue] = useState<Dayjs | null>(() => toPickerValue(date, time));
  const [timeView, setTimeView] = useState<'hours' | 'minutes'>('hours');
  const [skipTime, setSkipTime] = useState(false);

  const showBack = step === 'time' || (step === 'date' && dateView !== 'day');

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
    setDateView('day');
    setTimeView('hours');
    setSkipTime(false);
    setPickerValue(toPickerValue(date, time) ?? dayjs());
  }, [date, time]);

  const handleBack = useCallback(() => {
    if (step === 'time') {
      if (timeView === 'minutes') {
        setTimeView('hours');
        return;
      }

      setStep('date');
      setDateView('day');
      return;
    }

    if (dateView === 'year') {
      setDateView('day');
      return;
    }

    if (dateView === 'month') {
      setDateView('year');
      return;
    }

    closePicker();
  }, [closePicker, dateView, step, timeView]);

  const handleYearChange = useCallback(() => {
    setDateView('day');
  }, []);

  const handleDateChange = useCallback(
    (newDate: Dayjs | null, selectionState?: PickerSelectionState) => {
      if (!newDate) {
        return;
      }

      const nextValue = newDate
        .hour(pickerValue?.hour() ?? 0)
        .minute(pickerValue?.minute() ?? 0)
        .second(0)
        .millisecond(0);

      setPickerValue(nextValue);

      if (selectionState !== 'finish') {
        return;
      }

      onDateChange(formatDisplayDate(nextValue.format('YYYY-MM-DD')));
      setStep('time');
      setTimeView('hours');
    },
    [onDateChange, pickerValue],
  );

  const handleSkipTimeChange = useCallback(
    (checked: boolean) => {
      setSkipTime(checked);

      if (checked) {
        onTimeChange('');
        closePicker();
      }
    },
    [closePicker, onTimeChange],
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
      setSkipTime(false);
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
        {(showBack || step === 'time') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minHeight: 40,
              px: 1,
              pt: 0.5,
            }}
          >
            {showBack ? (
              <IconButton aria-label="חזרה" onClick={handleBack} size="small">
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            ) : (
              <Box sx={{ width: 40, flexShrink: 0 }} />
            )}
            {step === 'time' && (
              <Typography
                sx={[
                  rtlTextSx,
                  {
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '1.25px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  },
                ]}
              >
                {label}
              </Typography>
            )}
            {step === 'time' && <Box sx={{ width: 40, flexShrink: 0 }} />}
          </Box>
        )}
        {step === 'date' ? (
          <DateCalendar
            value={pickerValue}
            onChange={handleDateChange}
            view={dateView}
            onViewChange={setDateView}
            onYearChange={handleYearChange}
            views={['year', 'month', 'day']}
            openTo="day"
            yearsPerRow={3}
            slots={pickerArrowSlots}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TimeClock
              ampm={false}
              value={pickerValue}
              view={timeView}
              onViewChange={handleTimeViewChange}
              onChange={handleTimeChange}
              slots={pickerArrowSlots}
              sx={{ pb: 0, minHeight: 'auto' }}
            />
            <FormControlLabel
              sx={[
                rtlTextSx,
                {
                  m: 0,
                  mt: 0.25,
                  pb: 1,
                  justifyContent: 'center',
                },
              ]}
              control={
                <Checkbox
                  checked={skipTime}
                  onChange={(_, checked) => handleSkipTimeChange(checked)}
                  size="small"
                />
              }
              label={skipTimeLabel}
            />
          </Box>
        )}
      </Popover>
    </>
  );
}
