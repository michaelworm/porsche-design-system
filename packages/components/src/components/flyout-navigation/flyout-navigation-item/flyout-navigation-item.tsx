import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { getComponentCss } from './flyout-navigation-item-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { type PropTypes, type Theme } from '../../../types';
import {
  type FlyoutNavigationUpdateEvent,
  INTERNAL_UPDATE_EVENT_NAME,
} from '../flyout-navigation/flyout-navigation-utils';
import { type FlyoutNavigationItemInternalHTMLProps } from './flyout-navigation-item-utils';

const propTypes: PropTypes<typeof FlyoutNavigationItem> = {
  identifier: AllowedTypes.string,
  label: AllowedTypes.string,
};

@Component({
  tag: 'p-flyout-navigation-item',
  shadow: true,
})
export class FlyoutNavigationItem {
  @Element() public host!: HTMLElement & FlyoutNavigationItemInternalHTMLProps;

  @Prop() public label?: string;

  @Prop() public identifier?: string;

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback (internal private prop is controlled by flyout-navigation)
  }

  private get open(): boolean {
    return this.host.open || false; // default as fallback (internal private prop is controlled by flyout-navigation)
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-flyout-navigation');
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.open, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure
          stretch={true}
          active={this.open}
          aria={{ 'aria-expanded': this.open }}
          icon="arrow-head-right"
          size="medium"
          alignLabel="start"
          class="button"
          type="button"
          theme={this.theme}
          onClick={() => this.onClickButton(this.open ? undefined : this.identifier)}
        >
          {this.label}
        </PrefixedTagNames.pButtonPure>
        <div
          class="scroller"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          inert={this.open ? null : true} // prevents focusable elements during fade-out transition
        >
          <div class="header">
            <PrefixedTagNames.pButtonPure
              class="back"
              type="button"
              size="medium"
              icon="arrow-head-left"
              hideLabel={true}
              theme={this.theme}
              onClick={() => this.onClickButton(undefined)}
            >
              Back
            </PrefixedTagNames.pButtonPure>
            <h4 class="heading">{this.label}</h4>
          </div>
          <div class="content">
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  private onClickButton = (activeId: string | undefined): void => {
    const eventInitDictDetail = (): CustomEventInit<FlyoutNavigationUpdateEvent> => ({
      bubbles: true,
      detail: { activeId },
    });
    this.host.dispatchEvent(
      new CustomEvent<FlyoutNavigationUpdateEvent>(INTERNAL_UPDATE_EVENT_NAME, eventInitDictDetail())
    );
  };
}
