import type { Theme } from '../../../types';
import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';
import type {
  TabsBarUpdateEventDetail,
  TabsBarGradientColor,
  TabsBarGradientColorScheme,
  TabsBarSize,
  TabsBarWeight,
} from '../../tabs-bar/tabs-bar-utils';
import { forceUpdate } from '@stencil/core';

export type TabsSize = TabsBarSize;
export type TabsWeight = TabsBarWeight;
/** @deprecated */
export type TabsGradientColorScheme = TabsBarGradientColorScheme;
export type TabsGradientColor = TabsBarGradientColor;
/** @deprecated */
export type TabsUpdateEvent = TabsBarUpdateEventDetail;
export type TabsUpdateEventDetail = TabsUpdateEvent;

export const syncTabsItemsProps = (items: HTMLPTabsItemElement[], theme: Theme): void => {
  items.forEach((item: HTMLPTabsItemElement & TabsItemInternalHTMLProps) => {
    item.theme = theme;
    forceUpdate(item);
  });
};
