export const TEXT_COLORS_DEPRECATED = [
  'brand', // deprecated
  'default', // deprecated
  'neutral-contrast-low', // deprecated
  'neutral-contrast-medium', // deprecated
  'neutral-contrast-high', // deprecated
  'notification-neutral', // deprecated
] as const;
export const TEXT_COLORS = [
  'primary',
  'contrast-low',
  'contrast-medium',
  'contrast-high',
  'notification-success',
  'notification-warning',
  'notification-error',
  'notification-info',
  'inherit',
  ...TEXT_COLORS_DEPRECATED,
] as const;
export type TextColor = typeof TEXT_COLORS[number];
