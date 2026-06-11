import banksIconDark from '../assets/nav/banks-dark.png';
import banksIconLight from '../assets/nav/banks-light.png';
import campaignsIconDark from '../assets/nav/campaigns-dark.png';
import campaignsIconLight from '../assets/nav/campaigns-light.png';
import conferencesIconDark from '../assets/nav/conferences-dark.png';
import conferencesIconLight from '../assets/nav/conferences-light.png';

export const SIDEBAR_WIDTH = 240;

/** AppBar toolbar height */
export const APP_HEADER_HEIGHT = 64;

/** Gap between AppBar bottom and top toast alerts */
export const TOAST_TOP_GAP = 24;

/** Viewport offset for fixed top toast (below header + gap) */
export const TOAST_TOP_OFFSET = APP_HEADER_HEIGHT + TOAST_TOP_GAP;

/** Gap between header bottom and page title / first sidebar item */
export const HEADER_CONTENT_GAP = 56;

/** Offset from viewport top to main content / first nav item */
export const NAV_TOP_OFFSET = APP_HEADER_HEIGHT + HEADER_CONTENT_GAP;

export interface NavIcons {
  light: string;
  dark: string;
}

export interface NavItem {
  path: string;
  label: string;
  icons: NavIcons;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    path: '/conferences',
    label: 'ועידות',
    icons: { light: conferencesIconLight, dark: conferencesIconDark },
  },
  {
    path: '/banks',
    label: 'בנקים',
    icons: { light: banksIconLight, dark: banksIconDark },
  },
  {
    path: '/campaigns',
    label: 'מבצעים',
    icons: { light: campaignsIconLight, dark: campaignsIconDark },
  },
];
