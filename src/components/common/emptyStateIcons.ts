import bankDarkIcon from '../../assets/empty-state/dark/bank.png';
import mivzaDarkIcon from '../../assets/empty-state/dark/mivza.png';
import veidaDarkIcon from '../../assets/empty-state/dark/veida.png';
import bankLightIcon from '../../assets/empty-state/light/bank.png';
import mivzaLightIcon from '../../assets/empty-state/light/mivza.png';
import veidaLightIcon from '../../assets/empty-state/light/veida.png';
import type { ResolvedColorMode } from '../../theme/useResolvedColorMode';

export const EMPTY_STATE_ICON_SIZE = 125;
export const EMPTY_STATE_LIGHT_ICON_OPACITY = 0.8;

/** Table empty-state illustrations — bank (בנקים), mivza (מבצעים), veida (ועידות) */
export const emptyStateIcons = {
  light: {
    banks: bankLightIcon,
    campaigns: mivzaLightIcon,
    conferences: veidaLightIcon,
  },
  dark: {
    banks: bankDarkIcon,
    campaigns: mivzaDarkIcon,
    conferences: veidaDarkIcon,
  },
} as const;

export type EmptyStateIcon = keyof typeof emptyStateIcons.light;

export function getEmptyStateIconSrc(icon: EmptyStateIcon, mode: ResolvedColorMode): string {
  return emptyStateIcons[mode][icon];
}
