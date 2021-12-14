import type { BreakpointCustomizable, JssStyle, Styles } from '../../../utils';
import {
  addImportantToEachRule,
  buildHostStyles,
  buildResponsiveStyles,
  colorDarken,
  getCss,
  getFocusStyles,
  getInset,
  GetStylesFunction,
  getThemedColors,
  getTransition,
  isDark,
  mergeDeep,
  pxToRemWithUnit,
} from '../../../utils';
import { color } from '@porsche-design-system/utilities';
import type { LinkVariant, ThemeExtendedElectric } from '../../../types';

const { darkTheme } = color;

const getVariantColors = (
  variant: LinkVariant,
  theme: ThemeExtendedElectric
): { primaryColor: string; primaryColorHover: string; baseColor: string } => {
  const { brandColor, baseColor, contrastHighColor } = getThemedColors(theme);

  const colors: {
    [t in ThemeExtendedElectric]: {
      [v in LinkVariant]: { primaryColor: string; primaryColorHover: string; baseColor: string };
    };
  } = {
    light: {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: colorDarken.state.hover,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: contrastHighColor,
        primaryColorHover: colorDarken.neutralContrast.high,
        baseColor: darkTheme.default,
      },
      tertiary: {
        primaryColor: contrastHighColor,
        primaryColorHover: colorDarken.neutralContrast.high,
        baseColor,
      },
    },
    dark: {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: colorDarken.darkTheme.state.hover,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: darkTheme.default,
        primaryColorHover: colorDarken.darkTheme.default,
        baseColor: color.default,
      },
      tertiary: {
        primaryColor: darkTheme.default,
        primaryColorHover: darkTheme.default,
        baseColor,
      },
    },
    'light-electric': {
      primary: {
        primaryColor: brandColor,
        primaryColorHover: colorDarken.lightElectricTheme.state.hover,
        baseColor: darkTheme.default,
      },
      secondary: {
        primaryColor: contrastHighColor,
        primaryColorHover: colorDarken.lightElectricTheme.neutralContrast.high,
        baseColor: darkTheme.default,
      },
      tertiary: {
        primaryColor: contrastHighColor,
        primaryColorHover: colorDarken.lightElectricTheme.neutralContrast.high,
        baseColor,
      },
    },
  };

  return colors[theme][variant];
};

// TODO: can be optimized by reducing getVisibilityStyle + getSlottedLinkStyles depending on hasHref prop
export const getVisibilityStyle = (visible: boolean): JssStyle => {
  return visible
    ? {
        width: '100%',
        height: 'auto',
        margin: 0,
        overflow: 'visible',
        textIndent: 0,
      }
    : {
        width: 1,
        height: 1,
        margin: '0 0 0 -1px',
        overflow: 'hidden',
        textIndent: -1,
      };
};

const linkPadding = `${pxToRemWithUnit(11)} ${pxToRemWithUnit(15)} ${pxToRemWithUnit(11)} ${pxToRemWithUnit(39)}`;

export const getRootStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => ({
  root: {
    padding: hideLabel ? 0 : linkPadding,
  },
});

export const getIconLabelStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        icon: {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
        },
        label: getVisibilityStyle(!hideLabel),
      }
    : {
        icon: {
          left: pxToRemWithUnit(11),
          top: pxToRemWithUnit(11),
          transform: 'translate3d(0,0,0)',
        },
        label: getVisibilityStyle(!hideLabel),
      };
};

export const getSlottedLinkStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return addImportantToEachRule({
    '::slotted(a)': hideLabel
      ? {
          position: 'absolute',
          ...getInset(),
          padding: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textIndent: '99999px',
        }
      : {
          position: 'static',
          ...getInset('auto'),
          padding: linkPadding,
          overflow: 'visible',
          whiteSpace: 'normal',
          textIndent: 0,
        },
  });
};

export const getComponentCss = (
  variant: LinkVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  hasHref: boolean,
  theme: ThemeExtendedElectric
): string => {
  const isDarkTheme = isDark(theme);
  const isTertiary = variant === 'tertiary';
  const { primaryColor, primaryColorHover, baseColor } = getVariantColors(variant, theme);

  return getCss(
    mergeDeep<Styles>(
      {
        ...buildHostStyles({
          display: 'inline-flex',
          verticalAlign: 'top',
          cursor: 'pointer',
        }),
        root: {
          display: 'flex',
          width: '100%',
          minWidth: pxToRemWithUnit(48),
          minHeight: pxToRemWithUnit(48),
          position: 'relative',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          appearance: 'none',
          textDecoration: 'none',
          border: '1px solid currentColor',
          backgroundColor: isTertiary ? 'transparent' : 'currentColor',
          color: primaryColor,
          transition:
            getTransition('background-color') + ',' + getTransition('border-color') + ',' + getTransition('color'),
          '&:hover, &:active': {
            color: primaryColorHover,
            ...(isTertiary && {
              backgroundColor: 'currentColor',
              '& $label, & $icon': {
                color: isDarkTheme ? color.default : darkTheme.default,
              },
            }),
          },
          ...(hasHref && getFocusStyles()),
        },
        icon: {
          position: 'absolute',
          width: pxToRemWithUnit(24),
          height: pxToRemWithUnit(24),
          color: baseColor,
          pointerEvents: 'none',
        },
        label: {
          display: 'block',
          boxSizing: 'border-box',
          color: baseColor,
        },
        ...(!hasHref &&
          addImportantToEachRule({
            '::slotted(a)': {
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              lineHeight: 'inherit',
              outline: 'transparent solid 1px',
              outlineOffset: '3px',
            },
            '::slotted(a::-moz-focus-inner)': {
              border: 0,
            },
            '::slotted(a:focus)': {
              outlineColor: primaryColor,
            },
            '::slotted(a:hover:focus)': {
              outlineColor: primaryColorHover,
            },
            '::slotted(a:focus:not(:focus-visible))': {
              outlineColor: 'transparent',
            },
          })),
      },
      // TODO: would be better to handle one responsive style prop by one style function
      buildResponsiveStyles(hideLabel, getIconLabelStyles),
      hasHref ? buildResponsiveStyles(hideLabel, getRootStyles) : buildResponsiveStyles(hideLabel, getSlottedLinkStyles)
    )
  );
};
