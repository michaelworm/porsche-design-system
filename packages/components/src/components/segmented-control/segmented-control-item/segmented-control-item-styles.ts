import { getCss, isHighContrastMode } from '../../../utils';
import {
  addImportantToEachRule,
  getHighContrastColors,
  getInsetJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  pxToRemWithUnit,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  textSmallStyle,
  textXSmallStyle,
} from '@porsche-design-system/utilities-v2';
import type { Theme } from '../../../types';

export const ITEM_PADDING = '17px';
export const { font: BUTTON_FONT } = textSmallStyle;
export const { font: LABEL_FONT } = textXSmallStyle;
export const ICON_SIZE = pxToRemWithUnit(24);
export const ICON_MARGIN = pxToRemWithUnit(4);

export const getColors = (
  isDisabled: boolean,
  isSelected: boolean,
  theme: Theme
): {
  buttonColor: string;
  labelColor: string;
  borderColor: string;
  hoverBorderColor: string;
} => {
  const { primaryColor, contrastMediumColor, disabledColor, contrastLowColor } = getThemedColors(theme);
  const { highlightColor } = getHighContrastColors();

  return {
    buttonColor: isDisabled ? disabledColor : primaryColor,
    labelColor: isDisabled ? disabledColor : contrastMediumColor,
    borderColor: isSelected ? (isHighContrastMode ? highlightColor : primaryColor) : contrastLowColor,
    hoverBorderColor: primaryColor,
  };
};

export const getItemPadding = (hasIconAndSlottedContent: boolean): string =>
  hasIconAndSlottedContent ? `13px ${ITEM_PADDING} 13px 13px` : `13px ${ITEM_PADDING}`;

export const getComponentCss = (
  isDisabled: boolean,
  isSelected: boolean,
  hasIcon: boolean,
  hasSlottedContent: boolean,
  theme: Theme
): string => {
  const { focusColor } = getThemedColors(theme);
  const { focusColor: focusColorDark } = getThemedColors('dark');
  const { buttonColor, labelColor, borderColor, hoverBorderColor } = getColors(isDisabled, isSelected, theme);
  const {
    buttonColor: buttonColorDark,
    labelColor: labelColorDark,
    borderColor: borderColorDark,
    hoverBorderColor: hoverBorderColorDark,
  } = getColors(isDisabled, isSelected, 'dark');

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'block',
        outline: 0,
        ...hostHiddenStyles,
      }),
      // All width relevant styling has to be kept in sync with the tempDiv of the p-segmented-control utils
      button: {
        position: 'relative',
        display: 'block',
        height: '100%',
        width: '100%',
        padding: getItemPadding(hasIcon && hasSlottedContent),
        margin: 0, // Removes default button margin on safari 15
        border: `${borderWidthBase} solid ${borderColor}`,
        borderRadius: borderRadiusSmall,
        outline: 0,
        background: 'transparent',
        color: buttonColor,
        ...textSmallStyle,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: borderColorDark,
          color: buttonColorDark,
        }),
        '&::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-5),
          border: `${borderWidthBase} solid transparent`,
          borderRadius: '7px',
        },
        '&:focus::before': {
          borderColor: focusColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: focusColorDark,
          }),
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        ...(isDisabled
          ? {
              cursor: 'not-allowed',
            }
          : {
              cursor: 'pointer',
              ...(!isSelected &&
                hoverMediaQuery({
                  transition: getTransition('border-color'),
                  '&:hover': {
                    borderColor: hoverBorderColor,
                    ...prefersColorSchemeDarkMediaQuery(theme, {
                      borderColor: hoverBorderColorDark,
                    }),
                  },
                })),
            }),
      },
      // label
      span: {
        display: 'block',
        ...textXSmallStyle,
        overflowWrap: 'normal',
        color: labelColor,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: labelColorDark,
        }),
      },
    },
    ...(hasIcon && {
      icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        ...(hasSlottedContent && {
          marginInlineEnd: ICON_MARGIN,
        }),
      },
    }),
  });
};
