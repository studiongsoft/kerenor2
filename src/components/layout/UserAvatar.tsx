import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const AVATAR_SIZE = 44;
const STATUS_SIZE = 14;
const AVATAR_BORDER = 3;
const STATUS_BORDER = 2;

interface UserAvatarProps {
  initials?: string;
}

export function UserAvatar({ initials = 'MF' }: UserAvatarProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexShrink: 0,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      <Avatar
        sx={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          bgcolor: '#F5A623',
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.5px',
          border: `${AVATAR_BORDER}px solid #FFFFFF`,
          boxSizing: 'border-box',
        }}
      >
        {initials}
      </Avatar>
      <Box
        component="span"
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '0 /* @noflip */',
          width: STATUS_SIZE,
          height: STATUS_SIZE,
          borderRadius: '50%',
          bgcolor: '#2E7D32',
          border: `${STATUS_BORDER}px solid #FFFFFF`,
          boxSizing: 'border-box',
        }}
      />
    </Box>
  );
}
