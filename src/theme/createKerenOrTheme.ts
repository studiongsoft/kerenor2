import { createAppTheme, type CreateAppThemeOptions } from '@studiongsoft/design-lead';

/** Figma control height (42px) — `theme.spacing(5.25)` on the default 8px grid */
const CONTROL_HEIGHT_SPACING = 5.25;

const primaryPalette = {
  main: '#00838f',
  dark: '#006064',
  light: '#4fb3bf',
  contrastText: '#ffffff',
} as const;

/** Theme input for `createAppTheme` — primary + surfaces per color scheme (required for mode toggle). */
export const kerenOrThemeOptions = {
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '2rem',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '0.9375rem',
      letterSpacing: '0.46px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: ({ theme }: { theme: { spacing: (value: number, ...values: number[]) => string } }) => ({
          minHeight: theme.spacing(CONTROL_HEIGHT_SPACING),
          maxHeight: theme.spacing(CONTROL_HEIGHT_SPACING),
          padding: theme.spacing(1, 2.75),
          boxShadow:
            '0px 1px 5px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.2)',
        }),
        sizeSmall: {
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.4px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: { theme: { spacing: (value: number) => string } }) => ({
          minHeight: theme.spacing(CONTROL_HEIGHT_SPACING),
          textTransform: 'uppercase',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.4px',
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 500,
          fontSize: '0.875rem',
          letterSpacing: '0.17px',
          py: 0.75,
          px: 2,
          textAlign: 'right' as const,
        },
        body: {
          fontSize: '0.875rem',
          letterSpacing: '0.17px',
          textAlign: 'right' as const,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: primaryPalette,
        background: {
          default: '#fafafa',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        primary: primaryPalette,
        background: {
          default: '#0a0a0a',
          paper: '#1a1a1a',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        text: {
          primary: 'rgba(255, 255, 255, 0.87)',
          secondary: 'rgba(255, 255, 255, 0.6)',
        },
        action: {
          hover: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
};

/**
 * קרן אור — design tokens from Figma (node 11776:17394).
 * @see design-decisions/components/*.md
 */
export function createKerenOrTheme() {
  return createAppTheme({
    theme: kerenOrThemeOptions as NonNullable<CreateAppThemeOptions['theme']>,
  });
}
