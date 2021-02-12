import * as functions from '../../../src/utils/dom';
import { RadioButtonWrapper } from '../../../src/components/form/radio-button-wrapper/radio-button-wrapper';

describe('radio-button-wrapper', () => {
  it('should call function getHTMLElementAndThrowIfUndefined', () => {
    const spy = jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');
    const radioButton = new RadioButtonWrapper();
    try {
      radioButton.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
