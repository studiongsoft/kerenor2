import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

/**
 * RTL text alignment for sx props.
 * Never set `direction` in sx — with stylis RTL it flips to `ltr` and reverses flex/table order.
 * Document direction comes from `<html dir="rtl">` in index.html.
 */
export const rtlTextSx: SystemStyleObject<Theme> = {
  textAlign: 'right /* @noflip */',
};

/** @deprecated use rtlTextSx — kept for imports */
export const rtlRootSx = rtlTextSx;

export const rtlColumnSx: SystemStyleObject<Theme> = {
  ...rtlTextSx,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
};

export const rtlRowSx: SystemStyleObject<Theme> = {
  ...rtlTextSx,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
};
