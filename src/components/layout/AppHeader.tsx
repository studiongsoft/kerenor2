import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { APP_HEADER_HEIGHT } from '../../config/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { microAppearSx } from '../../theme/microAnimations';
import { UserAvatar } from './UserAvatar';

export function AppHeader() {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: 3, minHeight: APP_HEADER_HEIGHT, height: APP_HEADER_HEIGHT }}>
        <Stack
          component={RouterLink}
          to="/"
          direction="row"
          spacing={1}
          aria-label="מסך הבית"
          sx={{
            ...microAppearSx({ variant: 'fadeIn' }),
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            borderRadius: 1,
            '&:hover': {
              opacity: 0.85,
            },
          }}
        >
          <LayersOutlinedIcon color="primary" fontSize="small" />
          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
            ועידון
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            direction: 'ltr /* @noflip */',
            alignItems: 'center',
          }}
        >
          <UserAvatar />
          <Tooltip
            title="התנתקות"
            placement="top"
            enterDelay={300}
            slotProps={{
              popper: { dir: 'rtl' },
              tooltip: {
                sx: {
                  fontSize: 12,
                  lineHeight: 1.4,
                  py: 0.5,
                  px: 1,
                },
              },
            }}
          >
            <IconButton
              aria-label="יציאה"
              size="small"
              sx={{
                ...microAppearSx({ variant: 'fadeIn', delayMs: 140 }),
                color: 'text.secondary',
                p: 0.75,
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'action.hover',
                },
              }}
            >
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
