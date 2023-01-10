import * as puppeteer from 'puppeteer';
import { TagName } from '@porsche-design-system/shared';
import { ConsumedTagNamesForVersionsAndPrefixes, TagNameData, TagNamesWithPropertyNames } from './types';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [version: string]: { prefixes: string[] } };
  }
}

export const evaluatePage = async (
  page: puppeteer.Page,
  pdsTagNamesWithPropertyNames: TagNamesWithPropertyNames
): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
  const pdsCrawlerRawData = await page.evaluate(
    async ({ pdsTagNamesWithPropertyNames }): Promise<ConsumedTagNamesForVersionsAndPrefixes> => {
      const tagNames = Object.keys(pdsTagNamesWithPropertyNames);

      const getPdsComponentNameByPrefix = (el: Element, prefix: string): TagName | null => {
        const tagName = el.tagName.toLowerCase();
        return (
          (Object.keys(pdsTagNamesWithPropertyNames).find(
            (compName) => (prefix ? `${prefix}-${compName}` : compName) === tagName
          ) as TagName) || null
        );
      };

      const getAllChildElements = (el: Element): Element[] => {
        const children = Array.from(el.children)
          .concat(Array.from(el.shadowRoot?.children || []))
          .flat() as Element[];
        return children.concat(children.map(getAllChildElements).flat());
      };

      const getChildren = (el: Element): string | null =>
        Array.from(el.children).reduce((result, slotEl) => {
          if (slotEl.children.length) {
            const copy = slotEl.cloneNode(true) as Element;
            // we save only the highest dom level in the reports, in order not to make them too big
            copy.innerHTML = '(the content was stripped)';
            return result + copy.outerHTML;
          }
          return result + slotEl.outerHTML;
        }, '' as string) || el.textContent;

      const getHostPdsComponent = (el: Element, prefix: string): TagName | null => {
        const rootNode = (el.getRootNode() as ShadowRoot).host;
        if (rootNode) {
          return getPdsComponentNameByPrefix(rootNode, prefix);
        }
        return null;
      };

      const parseIfJSON = (jsonStr: string | number | symbol): object | string | number | symbol => {
        if (typeof jsonStr === 'string' && jsonStr.includes('{')) {
          try {
            // jsonStr is potentially JSON parsable string, e.g. "{ base: 'block', l: 'inline' }"
            return JSON.parse(
              jsonStr
                .replace(/'/g, '"') // convert single quotes to double quotes
                .replace(/[\s"]?([a-z\-]+)[\s"]?:([^//])/g, '"$1":$2') // wrap keys in double quotes if they don't have them but ignore potential urls
            );
          } catch {
            // jsonStr is string, e.g. "block" or "inline"
            return jsonStr;
          }
        } else {
          // jsonStr is object, e.g. { base: 'block', l: 'inline' } or number, e.g. 123 or boolean, e.g. true
          return jsonStr;
        }
      };

      const getAllConsumedProperties = <
        PComponentName extends keyof HTMLElementTagNameMap,
        PComponentElement extends HTMLElementTagNameMap[PComponentName],
        PComponentPropertyName extends keyof PComponentElement,
        PComponentPropertyValue extends keyof PComponentElement[PComponentPropertyName]
      >(
        el: Element,
        allPdsPropertiesForComponentName: string[]
      ) => {
        const pEl = el as PComponentElement;

        const stringifyIfObject = (val: PComponentPropertyValue): PComponentPropertyValue => {
          const parsedVal = parseIfJSON(val);
          // check if it's an object and stringify
          return typeof parsedVal === 'object'
            ? (JSON.stringify(parsedVal) as PComponentPropertyValue)
            : (parsedVal as PComponentPropertyValue);
        };

        return allPdsPropertiesForComponentName.reduce((result, propName) => {
          const propValue = pEl[propName as PComponentPropertyName] as PComponentPropertyValue;
          return {
            ...result,
            [propName]: stringifyIfObject(propValue),
          };
        }, {});
      };

      const getConsumedTagNamesForPrefix = (prefix: string, pdsElements: Element[]): TagNameData[] => {
        return pdsElements.map((el) => {
          const componentName = getPdsComponentNameByPrefix(el, prefix);

          if (!componentName) {
            throw new Error('Could not find component name');
          }

          const slotInfo = getChildren(el);
          const hostPdsComponent = getHostPdsComponent(el, prefix);

          return {
            [componentName]: {
              ...{
                properties: getAllConsumedProperties(el, pdsTagNamesWithPropertyNames[componentName]),
              },
              ...(slotInfo ? { children: slotInfo } : {}),
              ...(hostPdsComponent ? { hostPdsComponent: hostPdsComponent } : {}),
            },
          } as TagNameData;
        });
      };

      // get all dom elements from body
      const allDOMElements = getAllChildElements(document.querySelector('body') as Element);
      const getAllPdsElementsForPrefix = (prefix: string): Element[] =>
        allDOMElements.filter((el: Element) =>
          el.matches((prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames).join())
        );

      if (!document.porscheDesignSystem) {
        throw new Error('document.porscheDesignSystem is undefined');
      }

      return Object.entries(document.porscheDesignSystem).reduce(
        (result, [version, { prefixes }]) => ({
          ...result,
          [version]: prefixes.reduce(
            (result, prefix: string) => ({
              ...result,
              [prefix]: getConsumedTagNamesForPrefix(prefix, getAllPdsElementsForPrefix(prefix)),
            }),
            {}
          ),
        }),
        {}
      );
    },
    { pdsTagNamesWithPropertyNames }
  );

  return pdsCrawlerRawData;
};
