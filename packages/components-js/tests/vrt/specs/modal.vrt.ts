import { getVisualRegressionContentWrapperTester, getVisualRegressionStatesTester, testOptions } from '../helpers';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

describe('Modal', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression for basic modal', async () => {
    expect(await vrt.test('modal-basic', () => vrt.goTo('/#modal-basic'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for scrollable modal', async () => {
    expect(
      await vrt.test(
        'modal-scrollable',
        async () => {
          await vrt.goTo('/#modal-scrollable');
          await vrt.getPage().evaluate(() => {
            document.querySelector('p-modal').scrollTo(0, 10000);
          });
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for prefixed modal', async () => {
    const vrtSingleResolution = getVisualRegressionStatesTester();
    expect(
      await vrtSingleResolution.test('modal-prefixed', () => vrtSingleResolution.goTo('/#modal-prefixed'), testOptions)
    ).toBeFalsy();
  });

  it('should have no visual regression for fullscreen modal', async () => {
    expect(await vrt.test('modal-fullscreen', () => vrt.goTo('/#modal-fullscreen'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for fullscreen breakpoint modal', async () => {
    expect(
      await vrt.test('modal-fullscreen-breakpoint', () => vrt.goTo('/#modal-fullscreen-breakpoint'), testOptions)
    ).toBeFalsy();

    expect(
      await vrt.test(
        'modal-fullscreen-breakpoint-m',
        async () => {
          await vrt.goTo('/#modal-fullscreen-breakpoint');
          await vrt.getPage().evaluate(() => {
            (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
          });
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
