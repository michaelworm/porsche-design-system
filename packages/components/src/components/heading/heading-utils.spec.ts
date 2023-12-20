import { getHeadingTagType } from './heading-utils';
import * as hasSpecificTagUtil from '../../utils/dom/hasSpecificTag';

describe('getHeadingTagName()', () => {
  it('should return div if hasSpecificTag() is true', () => {
    const host = document.createElement('p-heading');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificTag').mockReturnValue(true);

    expect(getHeadingTagType(host, 'xx-large', 'h4')).toBe('div');
  });

  it('should return tag value if hasSpecificTag() is false and tag is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificTag').mockReturnValue(false);

    expect(getHeadingTagType(host, 'xx-large', 'h4')).toBe('h4');
  });

  it('should return h6 if hasSpecificTag() is false, tag is not passed but valid heading size is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificTag').mockReturnValue(false);

    expect(getHeadingTagType(host, 'small', undefined)).toBe('h6');
  });

  it('should return fallback h2 if hasSpecificTag() is false, tag is not passed and no valid heading size is passed', () => {
    const host = document.createElement('p-heading');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificTag').mockReturnValue(false);

    expect(getHeadingTagType(host, { base: 'small' }, undefined)).toBe('h2');
  });
});
