import Box from '@mui/material/Box';
import {
  SIDEBAR_NAV_DARK,
  SIDEBAR_NAV_ICON_INACTIVE,
} from '../../theme/createKerenOrTheme';
import type { ResolvedColorMode } from '../../theme/useResolvedColorMode';

interface SidebarNavIconProps {
  src: string;
  active: boolean;
  colorMode: ResolvedColorMode;
}

export function SidebarNavIcon({ src, active, colorMode }: SidebarNavIconProps) {
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        width: 24,
        height: 24,
        display: 'block',
        flexShrink: 0,
        bgcolor: active
          ? colorMode === 'dark'
            ? SIDEBAR_NAV_DARK.iconActive
            : theme.palette.primary.main
          : SIDEBAR_NAV_ICON_INACTIVE[colorMode],
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      })}
    />
  );
}
