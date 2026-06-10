import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

/** Primary button on the physical left, secondary on the physical right. */
export const primarySecondaryActionsSx: SxProps<Theme> = {
  display: 'flex',
  direction: 'ltr /* @noflip */',
  flexDirection: 'row',
  justifyContent: 'flex-start /* @noflip */',
  alignItems: 'center',
  gap: 1.5,
};

interface PrimarySecondaryActionsProps {
  primary: ReactNode;
  secondary: ReactNode;
  sx?: SxProps<Theme>;
}

export function PrimarySecondaryActions({ primary, secondary, sx }: PrimarySecondaryActionsProps) {
  const mergedSx = (sx ? { ...primarySecondaryActionsSx, ...sx } : primarySecondaryActionsSx) as SxProps<Theme>;

  return (
    <Box sx={mergedSx}>
      {primary}
      {secondary}
    </Box>
  );
}
