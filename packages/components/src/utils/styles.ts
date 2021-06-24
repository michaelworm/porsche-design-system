import { breakpoint, color } from '@porsche-design-system/utilities';
import type { Breakpoint } from '@porsche-design-system/utilities';
import type { JssStyle } from '.';

export const transitionDuration = 'var(--p-transition-duration, .24s)';
export const transitionTimingFunction = 'ease';

export const pxToRem = (px: number): number => px / 16;
export const pxToRemWithUnit = (px: number): string => `${pxToRem(px)}rem`;

export const getHoverStyles = (): JssStyle => {
  return {
    transition: `color ${transitionDuration} ${transitionTimingFunction} !important`,
    '&:hover': {
      color: `${color.state.hover} !important`,
    },
  };
};

type Options = {
  color?: string;
  offset?: number;
};

const defaultOptions: Options = {
  color: color.state.focus,
  offset: 2,
};

export const getFocusStyles = (opts?: Options): JssStyle => {
  const options: Options = { ...defaultOptions, ...opts };

  return {
    outline: 'transparent solid 1px !important',
    outlineOffset: `${options.offset}px !important`,
    '&::-moz-focus-inner': {
      border: '0 !important',
    },
    '&:focus': {
      outlineColor: `${options.color} !important`,
    },
    '&:focus:not(:focus-visible)': {
      outlineColor: 'transparent !important',
    },
  };
};

export { Breakpoint, breakpoint } from '@porsche-design-system/utilities';
export const mediaQuery = (minBreakpoint: Breakpoint): string => `@media (min-width: ${breakpoint[minBreakpoint]}px)`;
