import type { Theme, ThemeOptions } from '@mui/material/styles';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers/icons';

/** Figma elevation — date/time picker popover (matches POPUP_SHADOW) */
const PICKER_SHADOW = [
  '0 1px 10px 0 rgba(0, 0, 0, 0.12)',
  '0 4px 5px 0 rgba(0, 0, 0, 0.14)',
  '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
].join(', ');

/** Figma date/time picker popover width — node 31472:7173 */
export const PICKER_POPOVER_WIDTH = 277;

/** Gap between field and picker popover */
export const PICKER_POPOVER_OFFSET = 8;

/** MUI X swaps arrow icons in RTL; swap slots so right → previous, left → next. */
export const pickerArrowSlots = {
  leftArrowIcon: ArrowRightIcon,
  rightArrowIcon: ArrowLeftIcon,
} as const;

/** Clock face size — must match MUI X `CLOCK_WIDTH` used for number positioning. */
const CLOCK_FACE_SIZE = 220;

type ThemeCallback = { theme: Theme };

/** MUI X Date/Time picker overrides — Figma mui-RTL 31472:7173 */
export const datePickerComponents: NonNullable<ThemeOptions['components']> = {
  MuiDateCalendar: {
    styleOverrides: {
      root: {
        width: PICKER_POPOVER_WIDTH,
        maxWidth: PICKER_POPOVER_WIDTH,
        margin: 0,
      },
      viewTransitionContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 4,
      },
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      root: {
        width: PICKER_POPOVER_WIDTH,
        maxWidth: PICKER_POPOVER_WIDTH,
        maxHeight: 280,
        margin: 0,
        marginTop: 8,
        padding: '4px 8px',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignContent: 'center',
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      root: {
        position: 'relative',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 0,
        paddingLeft: 8,
        paddingRight: 8,
        minHeight: 44,
        maxHeight: 44,
        '& .MuiPickersArrowSwitcher-root': {
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      labelContainer: {
        marginRight: 0,
        marginLeft: 0,
        flex: 1,
        justifyContent: 'center',
      },
      label: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '1.25px',
        textTransform: 'uppercase',
        marginRight: 0,
        marginLeft: 0,
      },
      switchViewButton: {
        padding: 4,
      },
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      root: {
        direction: 'rtl',
      },
      button: ({ theme }: ThemeCallback) => ({
        color: theme.palette.text.secondary,
      }),
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }: ThemeCallback) => ({
        width: 32,
        height: 32,
        fontSize: 12,
        lineHeight: '20px',
        borderRadius: '50%',
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
          },
        },
        '&.MuiPickersDay-today:not(.Mui-selected)': {
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          backgroundColor: 'transparent',
        },
      }),
    },
  },
  MuiDayCalendar: {
    styleOverrides: {
      weekDayLabel: ({ theme }: ThemeCallback) => ({
        fontSize: 12,
        lineHeight: '20px',
        color: theme.palette.text.secondary,
        width: 36,
        height: 34,
      }),
      header: {
        justifyContent: 'space-between',
      },
    },
  },
  MuiPickersYear: {
    styleOverrides: {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      yearButton: ({ theme }: ThemeCallback) => ({
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        minWidth: 56,
        width: 'auto',
        maxWidth: '100%',
        padding: '4px 8px',
        borderRadius: 16,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '1.25px',
        lineHeight: 1,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: theme.palette.primary.main,
        margin: 0,
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      }),
    },
  },
  MuiTimeClock: {
    styleOverrides: {
      root: {
        width: PICKER_POPOVER_WIDTH,
        maxWidth: PICKER_POPOVER_WIDTH,
        minHeight: 324,
        padding: 8,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      arrowSwitcher: {
        top: 8,
        left: 8,
      },
    },
  },
  MuiClock: {
    styleOverrides: {
      root: {
        margin: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      clock: ({ theme }: ThemeCallback) => ({
        width: CLOCK_FACE_SIZE,
        height: CLOCK_FACE_SIZE,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      }),
      amButton: ({ theme }: ThemeCallback) => ({
        left: 16,
        bottom: 16,
        color: theme.palette.primary.main,
        fontSize: 15,
        fontWeight: 300,
        paddingLeft: 4,
        paddingRight: 4,
        '&.Mui-selected': {
          fontWeight: 700,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      }),
      pmButton: ({ theme }: ThemeCallback) => ({
        right: 16,
        bottom: 16,
        color: theme.palette.primary.main,
        fontSize: 15,
        fontWeight: 300,
        paddingLeft: 4,
        paddingRight: 4,
        '&.Mui-selected': {
          fontWeight: 700,
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      }),
    },
  },
  MuiClockNumber: {
    styleOverrides: {
      root: ({ theme }: ThemeCallback) => ({
        fontSize: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 1,
        '&.Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      }),
    },
  },
  MuiClockPointer: {
    styleOverrides: {
      root: ({ theme }: ThemeCallback) => ({
        backgroundColor: theme.palette.primary.main,
      }),
      thumb: ({ theme }: ThemeCallback) => ({
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      }),
    },
  },
  MuiPickersPopper: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        boxShadow: PICKER_SHADOW,
      },
    },
  },
};
