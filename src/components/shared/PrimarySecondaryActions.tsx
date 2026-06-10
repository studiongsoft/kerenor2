import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

/** Primary button on the physical left, secondary on the physical right. */
export const primarySecondaryActionsSx = {
  display: 'flex',
  direction: 'ltr /* @noflip */',
  flexDirection: 'row',
  justifyContent: 'flex-start /* @noflip */',
  alignItems: 'center',
  gap: 1.5,
} as const;

interface PrimarySecondaryActionsProps {
  primary: ReactNode;
  secondary: ReactNode;
  sx?: SxProps<Theme>;
}

export function PrimarySecondaryActions({ primary, secondary, sx }: PrimarySecondaryActionsProps) {
  return (
    <Stack component="div" sx={{ ...primarySecondaryActionsSx, ...sx }}>
      {primary}
      {secondary}
    </Stack>
  );
}
