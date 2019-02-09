import BaseService from '../baseService';

const route = '/__test-route__';

class TestService extends BaseService {}

class CacheTestService extends BaseService {
  static requestCache = new Map();
}

class SubscriptionTestService extends BaseService {
  static requestCache = new Map();
  static subscriptions = new Map();
}

describe('BaseService', () => {
  beforeEach(() => {
    global.fetch = null;
  });

  describe('#buildRoute', () => {
    test('Replaces route params with provided parameters', () => {
      expect(
        TestService.buildRoute('/test/{testId}/test2/{test2Id}/{test3}', {
          testId: 1,
          test2Id: 2,
          test3: 3
        })
      ).toBe('/test/1/test2/2/3');
    });
  });

  describe('#serviceUrl', () => {
    test('returns the base url and the extended classes route', () => {
      expect(TestService.serviceUrl(route)).toBe('BASE_SERVICE_URL/__test-route__');
    });
  });

  describe('#postFormRequest', () => {
    describe('Successful response', () => {
      test('makes a post request with form headers params', async () => {
        global.fetch = jest.fn(async () => ({ json: async () => {} }));
        global.localStorage = { getItem: () => 'token' };

        await TestService.postFormRequest('/test', { test: 'params' });

        expect(global.fetch.mock.calls[0][0]).toEqual('BASE_SERVICE_URL/test');
        expect(global.fetch.mock.calls[0][1]).toMatchSnapshot();
      });
    });

    describe('Failed response', () => {
      test('throws and console errors the response', async () => {
        expect.assertions(2);

        global.console.error = jest.fn();
        global.fetch = jest.fn(() => Promise.reject('REJECT_TEST'));

        await expect(TestService.postFormRequest(route, { test: 'params' })).rejects.toBe(
          'REJECT_TEST'
        );

        expect(global.console.error).toHaveBeenLastCalledWith('REJECT_TEST');
      });
    });
  });

  describe('#getRequest', () => {
    describe('Successfull response', () => {
      test('makes a fetch call to its serviceUrl', async () => {
        global.fetch = jest.fn(async () => ({ json: async () => {} }));

        await TestService.getRequest(route);

        expect(global.fetch.mock.calls[0][0]).toBe('BASE_SERVICE_URL/__test-route__');
      });

      test('makes a fetch call with an auth header', async () => {
        global.fetch = jest.fn(async () => ({ json: async () => {} }));

        await TestService.getRequest(route);

        expect(global.fetch.mock.calls[0][1].headers).toHaveProperty('Authorization');
      });

      test('returns the the responses json', async () => {
        global.fetch = jest.fn(async () => ({
          json: async () => ({
            hello: 'world'
          })
        }));

        const responseJson = await TestService.getRequest(route);

        expect(responseJson.hello).toBe('world');
      });
    });

    describe('Failed response', () => {
      test('throws and console errors the response', async () => {
        global.fetch = jest.fn(async () => ({
          status: 404,
          json: async () => 'Bad things'
        }));

        await expect(TestService.getRequest(route)).rejects.toBe('Bad things');
      });
    });
  });

  describe('#postJSONRequest', () => {
    test('stringifies params into request body', async () => {
      global.fetch = jest.fn(async () => ({ json: async () => {} }));

      await TestService.postJSONRequest('/test', { test: 'testval' });

      expect(fetch.mock.calls[0][0]).toBe('BASE_SERVICE_URL/test');
      expect(fetch.mock.calls[0][1]).toHaveProperty('body');

      const body = fetch.mock.calls[0][1].body;

      expect(body).toMatchSnapshot();
    });

    test('Returns parsed JSON reponse', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => 'A response'
      }));

      const res = await TestService.postJSONRequest('/test', { test: 'test' });

      expect(res).toBe('A response');
    });
  });

  describe('Request caching', () => {
    beforeEach(() => {
      CacheTestService.requestCache.clear();
    });

    describe('#getCacheRequest', () => {
      test("Does not try to get cahced request if class doesn't use request cache", () => {
        expect(TestService.getCachedRequest('route')).toBeNull();
      });

      test('Returns cahced request for the given route', () => {
        CacheTestService.requestCache.set('test', 1);

        expect(CacheTestService.getCachedRequest('test')).toBe(1);
      });
    });

    describe('#setCacheRequest', () => {
      test('Sets the new cache value for the provided route', () => {
        CacheTestService.setCachedRequest('route', 1);

        expect(CacheTestService.requestCache.get('route')).toBe(1);
      });
    });

    describe('#updateCacheRequest', () => {
      test("Uses provided default cache if route hasn't been cached yet", () => {
        CacheTestService.updateCacheRequest('route', n => n + 1, 0);

        expect(CacheTestService.requestCache.get('route')).toBe(1);
      });

      test('Uses existing cache if route has been cached before', () => {
        CacheTestService.requestCache.set('route', 1);
        CacheTestService.updateCacheRequest('route', n => n + 1, 0);

        expect(CacheTestService.requestCache.get('route')).toBe(2);
      });
    });

    describe('#deleteCacheRequest', () => {
      test('Removes the cache for that route', () => {
        CacheTestService.requestCache.set('route', 1);
        CacheTestService.deleteCacheRequest('route');

        expect(CacheTestService.requestCache.has('route')).toBeFalsy();
      });
    });

    describe('#clearCacheRequest', () => {
      test('Removes caches for all routes', () => {
        CacheTestService.requestCache.set('route', 1);
        CacheTestService.clearCacheRequest();

        expect(CacheTestService.requestCache.has('route')).toBeFalsy();
      });
    });
  });

  describe('Subscriptions', () => {
    beforeEach(() => {
      SubscriptionTestService.subscriptions.clear();
    });

    describe('#setSubscription', () => {
      test("Creates new subscription array if route hasn't been subscribed to", () => {
        expect(SubscriptionTestService.subscriptions.get('route')).toBeUndefined();

        const subscriber = jest.fn();

        SubscriptionTestService.setSubscription('route', subscriber);

        expect(SubscriptionTestService.subscriptions.get('route')).toHaveLength(1);
        expect(SubscriptionTestService.subscriptions.get('route')[0]).toBe(subscriber);
      });

      test('Appends new subscribers onto already existing route subscriptions', () => {
        const subscriber = jest.fn();

        SubscriptionTestService.setSubscription('route', () => {});
        SubscriptionTestService.setSubscription('route', subscriber);

        expect(SubscriptionTestService.subscriptions.get('route')).toHaveLength(2);
        expect(SubscriptionTestService.subscriptions.get('route')).toContain(subscriber);
      });

      test('Returns index of subscriber in route subscriptions array', () => {
        expect(SubscriptionTestService.setSubscription('route', () => {})).toBe(0);
      });
    });

    describe('#clearSubscription', () => {
      test('Removes the correct subscriber', () => {
        const subscriber = jest.fn();

        SubscriptionTestService.setSubscription('route', () => {});
        const subIndex = SubscriptionTestService.setSubscription('route', subscriber);
        SubscriptionTestService.setSubscription('route', () => {});

        SubscriptionTestService.clearSubscription('route', subIndex);

        expect(SubscriptionTestService.subscriptions.get('route')).not.toContain(subscriber);
      });
    });

    describe('#broadcast', () => {
      test('Calls each subscribed route with the cache for that route', () => {
        SubscriptionTestService.setCachedRequest('route', 1);

        const firstSub = jest.fn();
        const secondSub = jest.fn();

        SubscriptionTestService.setSubscription('route', firstSub);
        SubscriptionTestService.setSubscription('route', secondSub);

        SubscriptionTestService.broadcast('route');

        expect(firstSub).toHaveBeenCalledWith(1);
        expect(secondSub).toHaveBeenCalledWith(1);
      });
    });
  });
});
