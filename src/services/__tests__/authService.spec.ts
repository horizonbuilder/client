import AuthService from '../auth';

describe('AuthService', () => {
  describe('#login', () => {
    test('returns true if login was successful', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => ({ status: 'success' })
      }));

      const loginAttempt = await AuthService.login('test', 'test');

      expect(loginAttempt).toBeTruthy();
    });

    test('returns false if login was not successful', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => ({ status: 'nope!', error: 'test' })
      }));

      const loginAttempt = await AuthService.login('test', 'test');

      expect(loginAttempt).toMatchSnapshot();
    });
  });

  describe('#signup', () => {
    test('returns true if signup was successful', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => ({ status: 'success' })
      }));

      const loginAttempt = await AuthService.signup('test', 'test');

      expect(loginAttempt).toMatchSnapshot();
    });

    test('returns false if signup was not successful', async () => {
      global.fetch = jest.fn(async () => ({
        json: async () => ({ status: 'nope!', error: 'test error' })
      }));

      const loginAttempt = await AuthService.signup('test', 'test');

      expect(loginAttempt).toMatchSnapshot();
    });
  });
});
