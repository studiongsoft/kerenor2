import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import { microAppearSx } from '../../theme/microAnimations';

const AVATAR_SIZE = 44;
const STATUS_SIZE = 14;
const AVATAR_BORDER = 3;
const STATUS_BORDER = 2;

/** Matches `MuiAppBar` dark `backgroundColor` in `createKerenOrTheme` */
const DARK_TOP_BAR = '#272727';

interface UserAvatarProps {
  initials?: string;
}

export function UserAvatar({ initials = 'MF' }: UserAvatarProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        flexShrink: 0,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      <Avatar
        sx={[
          microAppearSx({ variant: 'scaleIn', delayMs: 80 }),
          (theme: Theme) => ({
            gridArea: '1 / 1',
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            bgcolor: '#F5A623',
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.5px',
            border: `${AVATAR_BORDER}px solid #FFFFFF`,
            boxSizing: 'border-box',
            ...theme.applyStyles('dark', {
              borderColor: DARK_TOP_BAR,
            }),
          }),
        ]}
      >
        {initials}
      </Avatar>
      <Box
        component="span"
        sx={[
          microAppearSx({ variant: 'pop', delayMs: 220, durationMs: 280 }),
          (theme: Theme) => ({
            gridArea: '1 / 1',
            alignSelf: 'end',
            justifySelf: 'start /* @noflip */',
            zIndex: 1,
            width: STATUS_SIZE,
            height: STATUS_SIZE,
            borderRadius: '50%',
            bgcolor: '#2E7D32',
            border: `${STATUS_BORDER}px solid #FFFFFF`,
            boxSizing: 'border-box',
            ...theme.applyStyles('dark', {
              borderColor: DARK_TOP_BAR,
            }),
          }),
        ]}
      />
    </Box>
  );
}
