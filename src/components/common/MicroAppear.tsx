import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import {
  microAppearSx,
  type MicroAppearVariant,
} from '../../theme/microAnimations';

interface MicroAppearProps extends BoxProps {
  variant?: MicroAppearVariant;
  delayMs?: number;
  durationMs?: number;
}

export function MicroAppear({
  variant,
  delayMs,
  durationMs,
  sx,
  ...props
}: MicroAppearProps) {
  return (
    <Box
      sx={[
        microAppearSx({ variant, delayMs, durationMs }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
}
