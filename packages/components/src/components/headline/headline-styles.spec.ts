import { getComponentCss, getSlottedCss } from './headline-styles';

xdescribe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['headline-1', 'left', 'primary', false, 'light'],
    ['inherit', 'left', 'primary', false, 'light'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['headline-2', 'center', 'inherit', true, 'dark'],
    ['headline-3', 'center', 'inherit', true, 'dark'],
    ['headline-4', 'center', 'inherit', true, 'dark'],
    ['headline-5', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])('should return correct css for variant: %j, align: %s, color: %s, ellipsis: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

xdescribe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
