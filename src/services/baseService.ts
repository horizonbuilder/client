import { CacheHelper } from './_helpers';

export default abstract class BaseService {
  static BASE_URL = process.env.BASE_SERVICE_URL;
  static JWT_SECRET = SERVICES.__JWT_SECRET__;
  static route: string;
  static ROUTE_REGEXP = /\{(\w+)\}/g;
  static requestCache: Map<string, any>;
  static subscriptions: Map<string, Array<Function>>;

  static ERROR_RESPONSE_CODES = [400, 401, 404, 500];

  static buildRoute(route: string, params: { [key: string]: string | number }): string {
    const routeWithParams = route.replace(this.ROUTE_REGEXP, param => {
      const paramKey = param.substring(1, param.length - 1);

      if (!params.hasOwnProperty(paramKey)) {
        throw new Error(`Params must include a key of ${param}`);
      }

      return String(params[paramKey]);
    });

    return routeWithParams;
  }

  static buildQueryRoute(route: string, params: { [key: string]: string | number }): string {
    const query = Object.entries(params).reduce((acc, param) => {
      const [key, value] = param;
      acc += `${key}=${value}&`;

      return acc;
    }, '');

    return `${route}?${query}`;
  }

  static serviceUrl(route: string = ''): string {
    return `${this.BASE_URL}${route}`;
  }

  static getJWT(): string | null {
    return localStorage.getItem(this.JWT_SECRET);
  }

  static authHeader(): { [key: string]: string } {
    return {
      Authorization: `Bearer: ${this.getJWT()}`
    };
  }

  static getCachedRequest<T>(route: string): T {
    this.requestCache = CacheHelper.loadCache();
    if (!this.requestCache) {
      return null
    }
    return this.requestCache.get(route);
  }

  static setCachedRequest<T>(route: string, response: T): void {
    this.requestCache = CacheHelper.loadCache();
    this.requestCache && this.requestCache.set(route, response);

    CacheHelper.saveCache(this.requestCache);
  }

  static updateCacheRequest<T>(route: string, updater: (cache: T) => T, defaultCache?: T): void {
    const newRequestValue = updater(this.getCachedRequest<T>(route) || defaultCache);

    this.setCachedRequest(route, newRequestValue);
  }

  static deleteCacheRequest(route: string): void {
    this.requestCache && this.requestCache.has(route) && this.requestCache.delete(route);

    CacheHelper.saveCache(this.requestCache);
  }

  static clearCacheRequest(): void {
    this.requestCache && this.requestCache.clear();

    CacheHelper.clearCache();
  }

  static async validateCache() {
    const cacheStatusRoute = SERVICES.CACHE_STATUS;
    let route = this.buildRoute(cacheStatusRoute, {});
    const cacheStatus = await this.getRequest(route);

    if (cacheStatus) {
      return CacheHelper.validateCache(cacheStatus);
    }
    return false;
  }


  static setSubscription(route: string, subscriber: Function): number {
    if (!this.subscriptions) return;

    const routeSubscriptions = this.subscriptions.get(route);

    if (routeSubscriptions) {
      routeSubscriptions.push(subscriber);
    } else {
      this.subscriptions.set(route, [subscriber]);
    }

    return this.subscriptions.get(route).indexOf(subscriber);
  }

  static clearSubscription(route: string, index: number): () => void {
    if (!this.subscriptions) return;

    this.subscriptions.get(route).splice(index, 1);
  }

  static broadcast(route: string): void {
    if (!this.subscriptions) return;

    const routeSubscriptions = this.subscriptions.get(route);

    if (!routeSubscriptions) return;

    const cache = this.getCachedRequest(route);

    for (let i = 0; i < routeSubscriptions.length; i++) {
      routeSubscriptions[i](cache);
    }
  }

  static async getRequest<T>(route: string, cache: boolean = false): Promise<T> {
    const cachedRequest = this.getCachedRequest<T>(route);
    if (cachedRequest) {
      return cachedRequest;
    }

    const response = await fetch(this.serviceUrl(route), {
      headers: {
        ...this.authHeader()
      }
    });

    const parsedResponse = await response.json();

    if (this.ERROR_RESPONSE_CODES.indexOf(response.status) > -1) {
      if (parsedResponse.redirect && parsedResponse.redirect == 'login') {
        localStorage.removeItem(SERVICES.__JWT_SECRET__);
        window.history.pushState(null, null, '/login');
      }
      throw parsedResponse;
    }

    if (cache) {
      this.setCachedRequest<T>(route, parsedResponse);
    }

    return parsedResponse;
  }

  static async postJSONRequest<I, O>(route: string, params: I): Promise<O> {
    const body = JSON.stringify(params);

    const response = await fetch(this.serviceUrl(route), {
      method: 'POST',
      headers: {
        ...this.authHeader(),
        'Content-Type': 'application/json'
      },
      body
    });

    return await response.json();
  }

  static async postFormRequest<T>(route: string, params: { [key: string]: any }): Promise<T> {
    const body = Object.keys(params).reduce((bodyParams, key) => {
      bodyParams.append(key, params[key]);

      return bodyParams;
    }, new URLSearchParams());

    try {
      const response = await fetch(this.serviceUrl(route), {
        headers: {
          ...this.authHeader()
        },
        method: 'POST',
        body
      });

      return response.json();
    } catch (e) {
      console.error(e);

      throw e;
    }
  }

  static async putJSONRequest<I, O>(route: string, params?: I): Promise<O> {
    const body = JSON.stringify(params);

    const response = await fetch(this.serviceUrl(route), {
      method: 'PUT',
      headers: {
        ...this.authHeader(),
        'Content-Type': 'application/json'
      },
      body
    });

    return await response.json();
  }

  static async deleteJSONRequest<I, O>(route: string, params?: I): Promise<O> {
    const body = JSON.stringify(params);

    const response = await fetch(this.serviceUrl(route), {
      method: 'DELETE',
      headers: {
        ...this.authHeader(),
        'Content-Type': 'application/json'
      },
      body
    });

    return await response.json();
  }

  static async deleteRequest<T>(route: string): Promise<T> {
    const response = await fetch(this.serviceUrl(route), {
      method: 'DELETE',
      headers: {
        ...this.authHeader()
      }
    });

    return await response.json();
  }
}
