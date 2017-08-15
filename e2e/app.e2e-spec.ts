import { StockMarketPage } from './app.po';

describe('stock-market App', () => {
  let page: StockMarketPage;

  beforeEach(() => {
    page = new StockMarketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
