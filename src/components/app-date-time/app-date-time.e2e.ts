import { newE2EPage } from '@stencil/core/testing';

describe('date-time', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<date-time></date-time>');
    const element = await page.find('date-time');
    expect(element).toHaveClass('hydrated');
  });
});
