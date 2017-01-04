import { QuantoTestPage } from './app.po';

describe('quanto-test App', function() {
  let page: QuantoTestPage;

  beforeEach(() => {
    page = new QuantoTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
