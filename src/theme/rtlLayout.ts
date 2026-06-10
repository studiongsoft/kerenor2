/**
 * RTL text alignment for sx props.
 * Never set `direction` in sx — with stylis RTL it flips to `ltr` and reverses flex/table order.
 * Document direction comes from `<html dir="rtl">` in index.html.
 */
export const rtlTextSx = {
  textAlign: 'right /* @noflip */',
} as const;

/** @deprecated use rtlTextSx — kept for imports */
export const rtlRootSx = rtlTextSx;

export const rtlColumnSx = {
  ...rtlTextSx,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
} as const;

export const rtlRowSx = {
  ...rtlTextSx,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
} as const;
