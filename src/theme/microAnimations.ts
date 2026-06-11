import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

export const MICRO_ANIMATION_DURATION_MS = 320;
export const MICRO_ANIMATION_STAGGER_MS = 45;

export type MicroAppearVariant = 'fadeUp' | 'fadeIn' | 'scaleIn' | 'pop';

/** Register once via `GlobalStyles` in the theme provider. */
export const microAnimationGlobalStyles = {
  '@keyframes kerenorMicroFadeUp': {
    from: { opacity: 0, transform: 'translateY(4px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes kerenorMicroFadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes kerenorMicroScaleIn': {
    from: { opacity: 0, transform: 'scale(0.98)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  '@keyframes kerenorMicroPop': {
    from: { opacity: 0, transform: 'scale(0.6)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
} as const;

const animationNames: Record<MicroAppearVariant, string> = {
  fadeUp: 'kerenorMicroFadeUp',
  fadeIn: 'kerenorMicroFadeIn',
  scaleIn: 'kerenorMicroScaleIn',
  pop: 'kerenorMicroPop',
};

const reducedMotionSx: SystemStyleObject<Theme> = {
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
    opacity: 1,
    transform: 'none',
  },
};

export function microAppearStagger(index: number, stepMs = MICRO_ANIMATION_STAGGER_MS): number {
  return index * stepMs;
}

export function microAppearSx(options?: {
  variant?: MicroAppearVariant;
  delayMs?: number;
  durationMs?: number;
}): SystemStyleObject<Theme> {
  const variant = options?.variant ?? 'fadeUp';
  const delayMs = options?.delayMs ?? 0;
  const durationMs = options?.durationMs ?? MICRO_ANIMATION_DURATION_MS;
  const name = animationNames[variant];

  return {
    opacity: 0,
    animation: `${name} ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1) ${delayMs}ms forwards`,
    ...reducedMotionSx,
  };
}
