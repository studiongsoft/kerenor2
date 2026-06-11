import type { SxProps, Theme } from '@mui/material/styles';
import { TABLE_ROW_HOVER } from '../../theme/createKerenOrTheme';

export type TableRowPresencePhase = 'entering' | 'highlighted' | 'present' | 'exiting';

export const TABLE_ROW_ENTER_MS = 260;
export const TABLE_ROW_EXIT_MS = 220;
/** How long a newly added row keeps hover styling before fading to default */
export const TABLE_ROW_HIGHLIGHT_MS = 1000;
export const TABLE_ROW_HIGHLIGHT_FADE_MS = 350;

const tableRowMotionTransition = `opacity ${TABLE_ROW_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TABLE_ROW_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
const tableRowBackgroundTransition = `background-color ${TABLE_ROW_HIGHLIGHT_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;

const tableRowReducedMotionSx = {
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    opacity: 1,
    transform: 'none',
    backgroundColor: 'transparent',
  },
} as const;

const tableRowHighlightSx = (theme: Theme) => ({
  backgroundColor: TABLE_ROW_HOVER.light,
  ...theme.applyStyles('dark', {
    backgroundColor: TABLE_ROW_HOVER.dark,
  }),
  '& .MuiTableCell-root': {
    backgroundColor: 'transparent',
  },
});

/** Table row enter/exit/highlight — use with `usePresenceList` phase on `TableRow` sx. */
export function tableRowPhaseSx(phase: TableRowPresencePhase): SxProps<Theme> {
  if (phase === 'present') {
    return {
      opacity: 1,
      transform: 'translateY(0)',
      backgroundColor: 'transparent',
      transition: `${tableRowMotionTransition}, ${tableRowBackgroundTransition}`,
      ...tableRowReducedMotionSx,
    };
  }

  if (phase === 'highlighted') {
    return (theme) => ({
      opacity: 1,
      transform: 'translateY(0)',
      transition: `${tableRowMotionTransition}, ${tableRowBackgroundTransition}`,
      ...tableRowHighlightSx(theme),
      ...tableRowReducedMotionSx,
    });
  }

  if (phase === 'exiting') {
    return {
      opacity: 0,
      transform: 'translateY(-6px)',
      transition: tableRowMotionTransition,
      ...tableRowReducedMotionSx,
    };
  }

  return {
    opacity: 0,
    transform: 'translateY(-6px)',
    transition: tableRowMotionTransition,
    ...tableRowReducedMotionSx,
  };
}
