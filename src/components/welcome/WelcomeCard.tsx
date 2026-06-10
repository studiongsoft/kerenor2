import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { POPUP_SHADOW, SURFACE_SHADOW } from '../../theme/createKerenOrTheme';
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
    <Paper
      component={RouterLink}
      to={to}
      elevation={0}
      sx={(theme) => ({
        width: 280,
        height: 'fit-content',
        pt: 0,
        px: 3,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        boxShadow: SURFACE_SHADOW,
        bgcolor: 'background.paper',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          boxShadow: POPUP_SHADOW,
          transform: 'translateY(-2px)',
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
    </Paper>
  );
}
