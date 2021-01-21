import { JSX, Component, Host, h, Element } from '@stencil/core';
import { getClosestHTMLElement, getPrefixedTagNames, insertSlottedStyles, prefix } from '../../../../utils';

@Component({
  tag: 'p-text-list-item',
  styleUrl: 'text-list-item.scss',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement;

  public componentDidLoad(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const textListItemClasses = {
      [prefix('text-list-item')]: true,
      [prefix(`text-list-item--${this.typeOfList}`)]: true,
      [prefix(`text-list-item--ordered-${this.typeOfOrderedList}`)]: this.typeOfList === 'ordered',
      [prefix('text-list-item--nested')]: this.isNestedList,
    };

    return (
      <Host role="listitem" class={textListItemClasses}>
        <slot />
      </Host>
    );
  }

  private get typeOfList(): string {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text-list']);
    const list = getClosestHTMLElement(this.host, PrefixedTagNames.pTextList);
    return list.getAttribute('list-type');
  }

  private get typeOfOrderedList(): string {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text-list']);
    const list = getClosestHTMLElement(this.host, PrefixedTagNames.pTextList);
    return list.getAttribute('order-type');
  }

  private get isNestedList(): boolean {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-text-list']);
    return !!getClosestHTMLElement(this.host, `${PrefixedTagNames.pTextList}[nested]`);
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      -webkit-transition: color .24s ease !important;
      transition: color .24s ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
