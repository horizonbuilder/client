import SalesService from '../sales';

const salesData = require('./salesData.json');

describe('SalesService', () => {
  beforeEach(() => {
    global.fetch = null;
  });

  describe('#getSales', () => {
    it('returns an array of sales', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => salesData
      }));

      const sales = await SalesService.getSales();

      expect(sales).toMatchSnapshot();
    });

    it('returns a single sale', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => salesData[0]
      }));

      const sale = await SalesService.getSale(1);
      expect(sale).toMatchSnapshot();
    });
  });
});
