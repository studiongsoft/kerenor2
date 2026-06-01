import { type ReactNode } from 'react';
import { AppThemeProvider, type CreateAppThemeOptions } from '@studiongsoft/design-lead';
import { kerenOrThemeOptions } from './createKerenOrTheme';

export const KEREN_OR_MODE_STORAGE_KEY = 'keren-or-color-mode';

export function KerenOrThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppThemeProvider
      themeOptions={{
        theme: kerenOrThemeOptions as NonNullable<CreateAppThemeOptions['theme']>,
      }}
      lang="he"
    >
      {children}
    </AppThemeProvider>
  );
}
