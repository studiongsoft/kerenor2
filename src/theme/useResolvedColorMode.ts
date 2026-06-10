import { useColorScheme } from '@mui/material/styles';

export type ResolvedColorMode = 'light' | 'dark';

/** Active color scheme — use instead of `theme.palette.mode` (static with CSS vars). */
export function useResolvedColorMode(): ResolvedColorMode {
  const { mode, systemMode } = useColorScheme();
  const resolved = mode === 'system' ? systemMode : mode;
  return resolved === 'dark' ? 'dark' : 'light';
}
