import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DARK_CARD_SURFACE, POPUP_SHADOW, SURFACE_SHADOW } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';

const CARD_DESCRIPTION =
  'ניהול משאבי הבסיס, יבוא מבק"ק וניהול ידני.';

interface WelcomeCardProps {
  title: string;
  to: string;
  illustration: ReactNode;
}

export function WelcomeCard({ title, to, illustration }: WelcomeCardProps) {
  return (
    <ButtonBase
      component={RouterLink}
      to={to}
      sx={(theme) => ({
        fontSize: '8px',
        width: 280,
        height: 'fit-content',
        pt: 0,
        px: 3,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        boxShadow: SURFACE_SHADOW,
        bgcolor: 'background.paper',
        ...theme.applyStyles('dark', {
          bgcolor: DARK_CARD_SURFACE,
        }),
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          boxShadow: POPUP_SHADOW,
          transform: 'translateY(-2px)',
          '@media (hover: none)': {
            boxShadow: SURFACE_SHADOW,
            transform: 'none',
          },
        },
        '&:active': {
          boxShadow: SURFACE_SHADOW,
          transform: 'translateY(0)',
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        ...rtlTextSx,
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, minHeight: 168 }}>
        {illustration}
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, ...rtlTextSx }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, ...rtlTextSx }}>
        {CARD_DESCRIPTION}
      </Typography>

      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          direction: 'ltr /* @noflip */',
          justifyContent: 'flex-start /* @noflip */',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.25,
            color: 'primary.main',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
          כניסה
        </Box>
      </Box>
    </ButtonBase>
  );
}
