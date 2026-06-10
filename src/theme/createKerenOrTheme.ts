import { createTheme } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';

/** Shared table layout tokens — exported for tableStyles */
export const TABLE_CELL_PX = 2;
export const TABLE_ROW_HEIGHT = 48;
/** Fixed height for buttons, inputs, search fields, and table headers */
export const CONTROL_HEIGHT = 40;
/** Minimum width for action buttons */
export const BUTTON_MIN_WIDTH = 80;
/** Uniform width for text inputs and search fields */
export const TEXT_FIELD_WIDTH = 410;
/** @deprecated use TEXT_FIELD_WIDTH */
export const SEARCH_FIELD_WIDTH = TEXT_FIELD_WIDTH;
/** Campaign add/edit dialog — Figma frame */
export const CAMPAIGN_FORM_DIALOG_WIDTH = 900;
export const CAMPAIGN_FORM_DIALOG_HEIGHT = 645;
/** Conference add/edit dialog */
export const CONFERENCE_FORM_DIALOG_WIDTH = 474;
/** Gap between popup search field and adjacent action button */
export const POPUP_SEARCH_ACTION_GAP = 16;
/** Gap between dialog title and first form field */
export const DIALOG_TITLE_CONTENT_GAP = 32;
/** Inset from dialog border to title / footer actions */
export const DIALOG_EDGE_PADDING = 32;
/** Popup tables (e.g. allocated conferences) */
export const POPUP_TABLE_MIN_HEIGHT = 190;
/** Single-line input text/placeholder line box — vertically centered in CONTROL_HEIGHT */
export const INPUT_LINE_HEIGHT = 20;
/** Top/bottom inset for label + text in CONTROL_HEIGHT single-line fields */
export const INPUT_VERTICAL_PADDING = (CONTROL_HEIGHT - INPUT_LINE_HEIGHT) / 2;
export const TABLE_HEAD_HEIGHT = CONTROL_HEIGHT;
export const TABLE_FOOTER_HEIGHT = 44;
export const TABLE_ACTIONS_COLUMN_WIDTH = 132;
export const TABLE_CELL_BORDER = 'rgba(0, 0, 0, 0.12)';
/** Table body row hover — 50% of `palette.action.hover` alpha (light 0.02, dark 0.04) */
export const TABLE_ROW_HOVER = {
  light: 'rgba(0, 0, 0, 0.02)',
  dark: 'rgba(255, 255, 255, 0.04)',
} as const;

/** Inactive sidebar nav icon fill — Figma avatar/fill */
export const SIDEBAR_NAV_ICON_INACTIVE = {
  light: '#BDBDBD',
  dark: '#757575',
} as const;

/** Figma elevation — top bar, sidebar, tables */
export const SURFACE_SHADOW = [
  '0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  '0 2px 2px 0 rgba(0, 0, 0, 0.14)',
  '0 3px 1px -2px rgba(0, 0, 0, 0.2)',
].join(', ');

/** Figma elevation — dialogs / popups */
export const POPUP_SHADOW = [
  '0 1px 10px 0 rgba(0, 0, 0, 0.12)',
  '0 4px 5px 0 rgba(0, 0, 0, 0.14)',
  '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
].join(', ');

/** Figma tab height (42px) — `theme.spacing(5.25)` on the default 8px grid */
const TAB_HEIGHT_SPACING = 5.25;

const FONT_FAMILY = '"Assistant", "Roboto", "Helvetica", "Arial", sans-serif';

/** Figma surface tokens (light) */
const SURFACE = {
  page: '#F4F7F9',
  paper: '#FFFFFF',
  tableHead: '#EBF5F6',
  sidebarActive: '#E7F3F5',
} as const;

/** Figma surface tokens (dark) — 2026-06-10 palette */
const DARK_SURFACE = {
  page: '#1D1D1D',
  sidebar: '#232323',
  topBar: '#272727',
  table: '#232323',
  popup: '#272727',
  input: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.12)',
} as const;

/** Dark card surface — welcome cards, popups */
export const DARK_CARD_SURFACE = DARK_SURFACE.popup;

/** Dark primary interaction tokens — exported for sidebar active icon */
export const DARK_PRIMARY = {
  main: '#00BCD4',
  dark: '#00ACC1',
  hover: 'rgba(0, 188, 212, 0.08)',
  selected: 'rgba(0, 188, 212, 0.16)',
} as const;

/** Dark sidebar nav item — Figma 2026-06-10 (default / hover / selected) */
export const SIDEBAR_NAV_DARK = {
  textDefault: 'rgba(255, 255, 255, 0.8)',
  textHover: '#FFFFFF',
  textActive: DARK_PRIMARY.main,
  iconActive: DARK_PRIMARY.dark,
  bgHover: 'rgba(255, 255, 255, 0.08)',
  bgActive: DARK_PRIMARY.selected,
} as const;

const primaryPalette = {
  main: '#00838f',
  dark: '#006064',
  light: '#4fb3bf',
  contrastText: '#ffffff',
} as const;

/** Cyan accent for dark mode (links, chips, active states) */
const darkPrimaryPalette = {
  main: DARK_PRIMARY.main,
  dark: DARK_PRIMARY.dark,
  light: DARK_PRIMARY.main,
  contrastText: '#000000',
} as const;

const secondaryPalette = {
  main: '#00A3B1',
  dark: '#00796B',
  light: '#E0F2F1',
  contrastText: '#ffffff',
} as const;

const lightText = {
  primary: '#000000',
  secondary: 'rgba(0, 0, 0, 0.6)',
  disabled: '#A0AEC0',
} as const;

type ThemeCallback = { theme: Theme };

/** Palette via CSS vars — `themePalette(theme).*` literals stay light-mode (#000) in styleOverrides. */
function themePalette(theme: Theme) {
  return (theme.vars ?? theme).palette;
}

/** Theme input for `createTheme` — primary + surfaces per color scheme (required for mode toggle). */
export const kerenOrThemeOptions = {
  direction: 'rtl' as const,
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h4: {
      fontSize: '34px',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '0.25px',
      textAlign: 'right',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0.15px',
      textAlign: 'right',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.6,
      letterSpacing: '0.15px',
      textAlign: 'right',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.15px',
      textAlign: 'right',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.45,
      letterSpacing: '0.2px',
      textAlign: 'right',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.15px',
      textAlign: 'right',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.17px',
      textAlign: 'right',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.4px',
      textAlign: 'right',
    },
    button: {
      fontFamily: FONT_FAMILY,
      textTransform: 'none',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '0.4px',
      lineHeight: '24px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ theme }: ThemeCallback) => ({
          textAlign: 'right /* @noflip */',
          backgroundColor: themePalette(theme).background.default,
          color: themePalette(theme).text.primary,
        }),
        '#root': {
          textAlign: 'right /* @noflip */',
          minHeight: '100vh',
          color: 'inherit',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme, ownerState }: ThemeCallback & { ownerState: { multiline?: boolean } }) => ({
          textAlign: 'right /* @noflip */',
          color: themePalette(theme).text.primary,
          ...(!ownerState.multiline && {
            alignItems: 'center',
          }),
        }),
        input: ({ theme, ownerState }: ThemeCallback & { ownerState: { multiline?: boolean } }) => ({
          textAlign: 'right /* @noflip */',
          color: themePalette(theme).text.primary,
          ...(!ownerState.multiline && {
            paddingTop: 0,
            paddingBottom: 0,
            height: `${CONTROL_HEIGHT}px`,
            minHeight: `${CONTROL_HEIGHT}px`,
            lineHeight: `${CONTROL_HEIGHT}px`,
            boxSizing: 'border-box',
          }),
        }),
        inputMultiline: {
          textAlign: 'right /* @noflip */',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: { variant?: string; shrink?: boolean } }) => ({
          textAlign: 'right /* @noflip */',
          transformOrigin: 'top right /* @noflip */',
          ...(ownerState.variant === 'outlined' &&
            !ownerState.shrink && {
              transform: `translate(-14px, ${INPUT_VERTICAL_PADDING}px) scale(1) /* @noflip */`,
            }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.shrink && {
              transform: 'translate(-14px, -9px) scale(0.75) /* @noflip */',
            }),
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          textAlign: 'right /* @noflip */',
        },
        secondary: {
          textAlign: 'right /* @noflip */',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
        message: {
          textAlign: 'right',
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
      styleOverrides: {
        root: {
          textAlign: 'right',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          textAlign: 'right',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          minWidth: BUTTON_MIN_WIDTH,
        },
        contained: ({ theme }: ThemeCallback) => ({
          minHeight: CONTROL_HEIGHT,
          maxHeight: CONTROL_HEIGHT,
          height: CONTROL_HEIGHT,
          width: 'auto',
          padding: '0 16px',
          boxShadow: 'none',
          ...theme.applyStyles('light', {
            color: '#FFFFFF',
          }),
          '&:hover': {
            boxShadow: 'none',
          },
        }),
        outlined: {
          minHeight: CONTROL_HEIGHT,
          height: CONTROL_HEIGHT,
          padding: '0 16px',
        },
        text: {
          minHeight: CONTROL_HEIGHT,
          height: CONTROL_HEIGHT,
        },
        sizeSmall: {
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.4px',
          minHeight: CONTROL_HEIGHT,
          height: CONTROL_HEIGHT,
        },
        containedPrimary: ({ theme }: ThemeCallback) => ({
          ...theme.applyStyles('dark', {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          minHeight: theme.spacing(TAB_HEIGHT_SPACING),
          textTransform: 'none',
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '0.1px',
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textAlign: 'right',
          color: 'inherit',
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          flexDirection: 'row',
          justifyContent: 'flex-start /* @noflip */',
          gap: '4px',
          color: themePalette(theme).text.primary,
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize: '14px',
          '&:hover': {
            color: themePalette(theme).text.primary,
          },
          '&:hover .MuiTableSortLabel-icon': {
            opacity: '1 !important',
          },
          '&.Mui-active': {
            color: themePalette(theme).text.primary,
          },
          '&.Mui-active .MuiTableSortLabel-icon': {
            opacity: '1 !important',
            color: `${themePalette(theme).primary.main} !important`,
          },
        }),
        icon: ({ theme }: ThemeCallback) => ({
          opacity: '0.6 !important',
          color: `${themePalette(theme).text.primary} !important`,
          margin: '0 !important',
          flexShrink: 0,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          display: 'table-cell',
          verticalAlign: 'middle',
        },
        head: ({ theme }: ThemeCallback) => ({
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '0.17px',
          padding: '0 16px',
          height: `${TABLE_HEAD_HEIGHT}px`,
          minHeight: `${TABLE_HEAD_HEIGHT}px`,
          maxHeight: `${TABLE_HEAD_HEIGHT}px`,
          textAlign: 'right',
          verticalAlign: 'middle',
          color: themePalette(theme).text.primary,
          backgroundColor: SURFACE.tableHead,
          borderBottom: `1px solid ${TABLE_CELL_BORDER}`,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_PRIMARY.hover,
            borderBottomColor: DARK_SURFACE.border,
          }),
        }),
        body: ({ theme }: ThemeCallback) => ({
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '0.17px',
          lineHeight: '20px',
          padding: '0 16px',
          height: `${TABLE_ROW_HEIGHT}px`,
          minHeight: `${TABLE_ROW_HEIGHT}px`,
          maxHeight: `${TABLE_ROW_HEIGHT}px`,
          textAlign: 'right',
          verticalAlign: 'middle',
          color: themePalette(theme).text.primary,
          borderBottom: `1px solid ${TABLE_CELL_BORDER}`,
          ...theme.applyStyles('dark', {
            color: themePalette(theme).text.primary,
            backgroundColor: DARK_SURFACE.table,
            borderBottomColor: DARK_SURFACE.border,
          }),
        }),
        footer: {
          height: `${TABLE_FOOTER_HEIGHT}px`,
          minHeight: `${TABLE_FOOTER_HEIGHT}px`,
          maxHeight: `${TABLE_FOOTER_HEIGHT}px`,
          padding: 0,
          borderBottom: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            height: `${TABLE_HEAD_HEIGHT}px`,
            minHeight: `${TABLE_HEAD_HEIGHT}px`,
            maxHeight: `${TABLE_HEAD_HEIGHT}px`,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            height: `${TABLE_ROW_HEIGHT}px`,
            minHeight: `${TABLE_ROW_HEIGHT}px`,
            maxHeight: `${TABLE_ROW_HEIGHT}px`,
          },
        },
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            height: `${TABLE_FOOTER_HEIGHT}px`,
            minHeight: `${TABLE_FOOTER_HEIGHT}px`,
            maxHeight: `${TABLE_FOOTER_HEIGHT}px`,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          height: `${TABLE_ROW_HEIGHT}px`,
          minHeight: `${TABLE_ROW_HEIGHT}px`,
          maxHeight: `${TABLE_ROW_HEIGHT}px`,
          'tbody &': {
            '&:hover': {
              backgroundColor: TABLE_ROW_HOVER.light,
              ...theme.applyStyles('dark', {
                backgroundColor: TABLE_ROW_HOVER.dark,
              }),
              '& .MuiTableCell-root': {
                backgroundColor: 'transparent',
              },
            },
          },
        }),
        footer: {
          height: `${TABLE_FOOTER_HEIGHT}px`,
          minHeight: `${TABLE_FOOTER_HEIGHT}px`,
          maxHeight: `${TABLE_FOOTER_HEIGHT}px`,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          borderRadius: 12,
          border: `1px solid ${themePalette(theme).divider}`,
          backgroundColor: themePalette(theme).background.paper,
          boxShadow: SURFACE_SHADOW,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.table,
            borderColor: DARK_SURFACE.border,
          }),
        }),
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          backgroundImage: 'none',
          backgroundColor: themePalette(theme).background.paper,
          borderBottom: `1px solid ${themePalette(theme).divider}`,
          boxShadow: SURFACE_SHADOW,
          textAlign: 'right',
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.topBar,
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          borderRadius: 12,
          border: `1px solid ${themePalette(theme).divider}`,
          boxShadow: 'none',
        }),
      },
    },
    MuiDialog: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: ({ theme }: ThemeCallback) => ({
          borderRadius: '4px',
          boxShadow: POPUP_SHADOW,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.popup,
          }),
        }),
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          maxHeight: 'unset',
          alignSelf: 'center',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({
          theme,
          ownerState,
        }: ThemeCallback & {
          ownerState: { multiline?: boolean; startAdornment?: boolean; endAdornment?: boolean };
        }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: themePalette(theme).background.paper,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.input,
          }),
          ...(!ownerState.multiline && {
            height: CONTROL_HEIGHT,
            minHeight: CONTROL_HEIGHT,
            maxHeight: CONTROL_HEIGHT,
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingTop: 0,
            paddingBottom: 0,
          }),
        }),
        input: ({
          ownerState,
        }: {
          ownerState: { multiline?: boolean; startAdornment?: boolean; endAdornment?: boolean };
        }) => ({
          ...(!ownerState.multiline && {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: ownerState.startAdornment ? 0 : '14px',
            paddingRight: ownerState.endAdornment ? 0 : '14px',
            height: `${CONTROL_HEIGHT}px`,
            minHeight: `${CONTROL_HEIGHT}px`,
            lineHeight: `${CONTROL_HEIGHT}px`,
            boxSizing: 'border-box',
          }),
        }),
        notchedOutline: ({ theme }: ThemeCallback) => ({
          borderColor: themePalette(theme).divider,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          height: 28,
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: FONT_FAMILY,
        },
        outlined: ({ theme }: ThemeCallback) => ({
          borderColor: themePalette(theme).primary.main,
          color: themePalette(theme).primary.main,
          backgroundColor: 'transparent',
          ...theme.applyStyles('dark', {
            borderColor: themePalette(theme).primary.main,
            color: themePalette(theme).primary.main,
            backgroundColor: DARK_SURFACE.table,
          }),
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }: ThemeCallback) => ({
          borderRadius: 8,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.popup,
          }),
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: ThemeCallback) => ({
          borderRadius: 8,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.popup,
          }),
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          color: themePalette(theme).primary.main,
          fontWeight: 400,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
          ...theme.applyStyles('dark', {
            color: themePalette(theme).primary.main,
          }),
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          borderBottom: 'none',
          color: themePalette(theme).text.secondary,
          height: `${TABLE_FOOTER_HEIGHT}px`,
          minHeight: `${TABLE_FOOTER_HEIGHT}px`,
          maxHeight: `${TABLE_FOOTER_HEIGHT}px`,
          padding: 0,
        }),
        toolbar: {
          height: TABLE_FOOTER_HEIGHT,
          minHeight: TABLE_FOOTER_HEIGHT,
          maxHeight: TABLE_FOOTER_HEIGHT,
        },
        selectLabel: ({ theme }: ThemeCallback) => ({
          fontSize: '14px',
          fontFamily: FONT_FAMILY,
          color: themePalette(theme).text.secondary,
        }),
        displayedRows: ({ theme }: ThemeCallback) => ({
          fontSize: '14px',
          fontFamily: FONT_FAMILY,
          color: themePalette(theme).text.secondary,
        }),
        select: ({ theme }: ThemeCallback) => ({
          color: themePalette(theme).text.secondary,
        }),
        actions: ({ theme }: ThemeCallback) => ({
          color: themePalette(theme).action.active,
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }: ThemeCallback) => ({
          borderRadius: 8,
          margin: 8,
          minHeight: 48,
          color: themePalette(theme).text.primary,
          '& .MuiListItemIcon-root': {
            color: 'inherit',
            '& img': {
              opacity: 1,
            },
          },
          '& .MuiListItemText-primary': {
            textAlign: 'right /* @noflip */',
          },
          ...theme.applyStyles('dark', {
            color: SIDEBAR_NAV_DARK.textDefault,
            backgroundColor: 'transparent',
          }),
          '&:hover': {
            backgroundColor: 'rgba(0, 131, 143, 0.04)',
            ...theme.applyStyles('dark', {
              backgroundColor: SIDEBAR_NAV_DARK.bgHover,
              color: SIDEBAR_NAV_DARK.textHover,
              '& .MuiListItemText-primary': {
                color: SIDEBAR_NAV_DARK.textHover,
              },
            }),
          },
          '&.Mui-selected': {
            backgroundColor: SURFACE.sidebarActive,
            color: themePalette(theme).primary.main,
            ...theme.applyStyles('dark', {
              backgroundColor: SIDEBAR_NAV_DARK.bgActive,
              color: SIDEBAR_NAV_DARK.textActive,
              '& .MuiListItemIcon-root img': {
                opacity: 1,
              },
            }),
            '& .MuiListItemIcon-root': {
              color: themePalette(theme).primary.main,
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
              color: themePalette(theme).primary.main,
              ...theme.applyStyles('dark', {
                fontWeight: 400,
                color: SIDEBAR_NAV_DARK.textActive,
              }),
            },
            '&:hover': {
              backgroundColor: SURFACE.sidebarActive,
              ...theme.applyStyles('dark', {
                backgroundColor: SIDEBAR_NAV_DARK.bgActive,
                color: SIDEBAR_NAV_DARK.textActive,
                '& .MuiListItemText-primary': {
                  color: SIDEBAR_NAV_DARK.textActive,
                },
              }),
            },
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: ThemeCallback) => ({
          backgroundColor: themePalette(theme).background.paper,
          borderInlineEnd: `1px solid ${themePalette(theme).divider}`,
          boxShadow: SURFACE_SHADOW,
          ...theme.applyStyles('dark', {
            backgroundColor: DARK_SURFACE.sidebar,
          }),
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.334,
          padding: '24px 32px 16px',
          textAlign: 'right',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '8px 32px',
          textAlign: 'right',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 32px 24px',
          gap: 12,
          direction: 'ltr /* @noflip */',
          flexDirection: 'row',
          justifyContent: 'flex-start /* @noflip */',
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: primaryPalette,
        secondary: secondaryPalette,
        background: {
          default: SURFACE.page,
          paper: SURFACE.paper,
        },
        text: lightText,
        divider: '#E2E8F0',
        action: {
          active: '#718096',
          hover: 'rgba(0, 0, 0, 0.04)',
          selected: 'rgba(0, 131, 143, 0.08)',
          disabled: 'rgba(45, 55, 72, 0.26)',
          disabledBackground: 'rgba(45, 55, 72, 0.12)',
        },
      },
    },
    dark: {
      palette: {
        primary: darkPrimaryPalette,
        secondary: secondaryPalette,
        background: {
          default: DARK_SURFACE.page,
          paper: DARK_SURFACE.table,
        },
        divider: DARK_SURFACE.border,
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.38)',
        },
        action: {
          active: 'rgba(255, 255, 255, 0.7)',
          hover: 'rgba(255, 255, 255, 0.08)',
          selected: DARK_PRIMARY.selected,
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
};

/**
 * קרן אור — design tokens from Figma (updated screens 2026-06).
 * @see design-decisions/components/*.md
 */
export function createKerenOrTheme() {
  return createTheme(kerenOrThemeOptions as ThemeOptions);
}
