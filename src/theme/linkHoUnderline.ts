import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

const underlineStrokeBase: SystemStyleObject<Theme> = {
  content: '""',
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '1px',
  bgcolor: 'currentColor',
  transform: 'scaleX(0)',
  pointerEvents: 'none',
  transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
};

/** RTL text links — underline grows right → left (under letters only) */
export const linkHoUnderlineSx: SystemStyleObject<Theme> = {
  position: 'relative',
  display: 'inline-block',
  width: 'fit-content',
  maxWidth: '100%',
  lineHeight: 1.4,
  textDecoration: 'none',
  '&::after': {
    ...underlineStrokeBase,
    transformOrigin: 'right /* @noflip */',
  },
  '@media (hover: hover)': {
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
  },
  '@media (hover: none), (prefers-reduced-motion: reduce)': {
    '&:hover::after': {
      transform: 'none',
    },
  },
};

/** LTR primary cells (e.g. conference number) — underline grows left → right */
export const linkHoUnderlineLtrSx: SystemStyleObject<Theme> = {
  position: 'relative',
  display: 'inline-block',
  width: 'fit-content',
  maxWidth: '100%',
  lineHeight: 1.4,
  textDecoration: 'none',
  '&::after': {
    ...underlineStrokeBase,
    transformOrigin: 'left /* @noflip */',
  },
  '@media (hover: hover)': {
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
  },
  '@media (hover: none), (prefers-reduced-motion: reduce)': {
    '&:hover::after': {
      transform: 'none',
    },
  },
};
