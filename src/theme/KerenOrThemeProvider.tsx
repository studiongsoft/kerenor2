import { type ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import { rtlCache } from '@studiongsoft/design-lead';
import { createKerenOrTheme } from './createKerenOrTheme';

export const KEREN_OR_MODE_STORAGE_KEY = 'keren-or-color-mode';

/** Created once — recreating the theme on each render resets color mode to light. */
const kerenOrTheme = createKerenOrTheme();

export function KerenOrThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <InitColorSchemeScript
        attribute="data-mui-color-scheme"
        defaultMode="light"
        modeStorageKey={KEREN_OR_MODE_STORAGE_KEY}
      />
      <CacheProvider value={rtlCache}>
        <ThemeProvider
          theme={kerenOrTheme}
          defaultMode="light"
          modeStorageKey={KEREN_OR_MODE_STORAGE_KEY}
        >
          <div dir="rtl" lang="he">
            <CssBaseline />
            {children}
          </div>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
