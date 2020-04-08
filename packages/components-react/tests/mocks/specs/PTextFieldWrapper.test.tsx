import * as React from 'react';
import { render } from '@testing-library/react';
import { PTextFieldWrapper } from '../../../projects/components-wrapper/src';

describe('PTextFieldWrapper', () => {
  it('should render PTextFieldWrapper text input', () => {
    const {container} = render(
      <PTextFieldWrapper>
        <input type={"text"} name={"Wrapped-Text-Field"}/>
      </PTextFieldWrapper>
    );
    expect(container.getElementsByTagName('input').namedItem("Wrapped-Text-Field")).toBeTruthy();
  });

  it('should render TagName of component', ()=> {
    const {container} = render(<PTextFieldWrapper/>);
    expect(container.getElementsByTagName('p-text-field-wrapper')).toBeTruthy();
  });
});
