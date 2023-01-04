import { defaultViewports, getVisualRegressionTester, vrtTest } from '@porsche-design-system/shared/testing';

xit.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'segmented-control', '/segmented-control', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});
