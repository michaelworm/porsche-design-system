import { Component, Element, Host, JSX, h, Prop } from '@stencil/core';
import {
  attachComponentCss,
  breakpoint,
  improveFocusHandlingForCustomElement,
  parseAndGetAccessibilityAttributes,
} from '../../../utils';
import type { LinkTarget, SelectedAriaAttributes } from '../../../types';
import { buildSrcSet, cdnBaseUrl, getManifestPath } from './marque-utils';
import type { MarqueSize } from './marque-utils';
import { getComponentCss } from './marque-styles';
import type { MarqueAriaAttributes } from './marque-utils';
import { MARQUE_ARIA_ATTRIBUTES } from './marque-utils';

@Component({
  tag: 'p-marque',
  shadow: true,
})
export class Marque {
  @Element() public host!: HTMLElement;

  /** Show/hide trademark sign. */
  @Prop() public trademark?: boolean = true;

  /** Adapts sizing of marque. */
  @Prop() public size?: MarqueSize = 'responsive';

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  /** Add ARIA attributes. */
  @Prop() public accessibility?: SelectedAriaAttributes<MarqueAriaAttributes>;

  public connectedCallback(): void {
    improveFocusHandlingForCustomElement(this.host);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.size);
  }

  public render(): JSX.Element {
    const manifestPath = getManifestPath(this.trademark);
    const picture = (
      <picture>
        {this.size === 'responsive' ? (
          [
            <source srcSet={buildSrcSet(manifestPath, 'medium')} media={`(min-width: ${breakpoint.l}px)`} />,
            <source srcSet={buildSrcSet(manifestPath, 'small')} />,
          ]
        ) : (
          <source srcSet={buildSrcSet(manifestPath, this.size)} />
        )}
        <img src={`${cdnBaseUrl}/${manifestPath.medium['2x']}`} alt="Porsche" />
      </picture>
    );

    return (
      <Host>
        {this.href === undefined ? (
          picture
        ) : (
          <a
            href={this.href}
            target={this.target}
            {...parseAndGetAccessibilityAttributes(this.accessibility, MARQUE_ARIA_ATTRIBUTES)}
          >
            {picture}
          </a>
        )}
      </Host>
    );
  }
}
