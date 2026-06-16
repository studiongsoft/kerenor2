import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DARK_CARD_SURFACE, POPUP_SHADOW, SURFACE_SHADOW } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';

interface WelcomeCardProps {
  title: string;
  description: string;
  to: string;
  illustration: ReactNode;
}

export function WelcomeCard({ title, description, to, illustration }: WelcomeCardProps) {
  return (
    <ButtonBase
      component={RouterLink}
      to={to}
      sx={[
        rtlTextSx,
        (theme) => ({
          fontSize: '8px',
          width: 280,
          minHeight: 300,
          height: 323,
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
            '@media (hover: hover)': {
              transform: 'translateY(-2px)',
            },
            '& .welcome-card-cta': {
              color: 'primary.main',
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
        }),
      ]}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, minHeight: 168 }}>
        {illustration}
      </Box>

      <Typography variant="h6" sx={[rtlTextSx, { fontWeight: 600, mb: 1 }]}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={[rtlTextSx, { height: '100%', mb: 3, lineHeight: 1.6 }]}>
        {description}
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
          className="welcome-card-cta"
          sx={(theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.25,
            alignSelf: 'flex-start /* @noflip */',
            py: 0.5,
            pr: 0.5,
            color: 'text.secondary',
            fontSize: 14,
            fontWeight: 500,
            transition: theme.transitions.create('color', {
              duration: theme.transitions.duration.short,
            }),
            ...theme.applyStyles('dark', {
              color: 'text.primary',
            }),
            '&:hover .welcome-card-cta-arrow': {
              '@media (hover: hover)': {
                transform: 'translateX(3px)',
              },
            },
          })}
        >
          <ChevronLeftIcon
            className="welcome-card-cta-arrow"
            sx={{
              fontSize: 18,
              transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            }}
          />
          כניסה
        </Box>
      </Box>
    </ButtonBase>
  );
}
