import WorkfilesService from '../workfiles';

const workfilesData = [
  {
    name: 'workfile0',
    status: 'in-progress',
    client_name: 'client0',
    created_at: '2017-09-22T11:12:55.325Z'
  },
  {
    name: 'workfile1',
    status: 'prospective',
    client_name: 'client1',
    created_at: '2017-09-22T11:12:55.330Z'
  }
];

describe('WorkfilesService', () => {
  beforeEach(() => {
    global.fetch = null;
  });

  describe('#getWorkfiles', () => {
    test('returns an array of workfiles', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => workfilesData
      }));

      const workfiles = await WorkfilesService.getWorkfiles();

      expect(workfiles).toMatchSnapshot();
    });
  });
});
