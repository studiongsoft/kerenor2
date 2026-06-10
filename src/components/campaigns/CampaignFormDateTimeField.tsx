import { useId, useRef } from 'react';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {
  formatDateTimeField,
  formatDisplayDate,
  isoDateFromDisplay,
} from '../../utils/campaignFormLogic';
import { rtlTextSx } from '../../theme/rtlLayout';

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
  const dateInputId = useId();
  const timeInputId = useId();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) {
      return;
    }
    input.showPicker?.();
    input.click();
  };

  const openTimePicker = () => {
    const input = timeInputRef.current;
    if (!input) {
      return;
    }
    input.showPicker?.();
    input.click();
  };

  const handleDateInput = (isoValue: string) => {
    onDateChange(formatDisplayDate(isoValue));
    if (isoValue) {
      openTimePicker();
    }
  };

  return (
    <>
      <TextField
        label={label}
        required={required}
        fullWidth
        value={formatDateTimeField(date, time)}
        placeholder="DD/MM/YYYY | HH:MM"
        error={error}
        helperText={helperText}
        onClick={openDatePicker}
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
                    openDatePicker();
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
      <input
        id={dateInputId}
        ref={dateInputRef}
        type="date"
        tabIndex={-1}
        aria-hidden
        value={isoDateFromDisplay(date)}
        onChange={(event) => handleDateInput(event.target.value)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <input
        id={timeInputId}
        ref={timeInputRef}
        type="time"
        tabIndex={-1}
        aria-hidden
        value={time || '00:00'}
        onChange={(event) => onTimeChange(event.target.value)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
