import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import colorModeToggleDark from '../../assets/color-mode-toggle-dark.png';
import colorModeToggleLight from '../../assets/color-mode-toggle-light.png';
import { useResolvedColorMode } from '../../theme/useResolvedColorMode';

/** Figma segmented pill — sun (light) | moon (dark), LTR segment order regardless of sidebar RTL */
const TOGGLE_WIDTH = 95.2;
const TOGGLE_HEIGHT = 37.4;

const segmentButtonSx = (isActive: boolean, isDark: boolean) => ({
  flex: 1,
  height: '100%',
  borderRadius: 0,
  minWidth: 0,
  p: 0,
  zIndex: 1,
  color: 'transparent',
  bgcolor: 'transparent',
  ...(!isActive && {
    '&:hover': {
      bgcolor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 131, 143, 0.08)',
    },
  }),
});

export function ColorModeToggle() {
  const { setMode } = useColorScheme();
  const colorMode = useResolvedColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box
      role="group"
      aria-label="מצב תצוגה"
      className="KerenOr-colorModeToggle"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row /* @noflip */',
        width: TOGGLE_WIDTH,
        height: TOGGLE_HEIGHT,
        flexShrink: 0,
        direction: 'ltr /* @noflip */',
      }}
    >
      <Box
        component="img"
        key={colorMode}
        src={isDark ? colorModeToggleDark : colorModeToggleLight}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: TOGGLE_WIDTH,
          height: TOGGLE_HEIGHT,
          display: 'block',
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
      />
      <IconButton
        aria-label="מצב בהיר"
        aria-pressed={!isDark}
        onClick={() => setMode('light')}
        disableRipple
        className="KerenOr-colorModeToggle-light"
        sx={segmentButtonSx(!isDark, isDark)}
      />
      <IconButton
        aria-label="מצב כהה"
        aria-pressed={isDark}
        onClick={() => setMode('dark')}
        disableRipple
        className="KerenOr-colorModeToggle-dark"
        sx={segmentButtonSx(isDark, isDark)}
      />
    </Box>
  );
}
