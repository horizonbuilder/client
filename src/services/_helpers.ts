import * as moment from 'moment';

export class CacheHelper {
  private static LAST_UPDATE_TIME = 'lastUpdateTime';

  private static strMapToObj(strMap) {
    let obj = Object.create(null);
    strMap.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }
  private static objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }

  private static strMapToJson(strMap) {
    return JSON.stringify(this.strMapToObj(strMap));
  }
  private static jsonToStrMap(jsonStr) {
    return this.objToStrMap(JSON.parse(jsonStr));
  }

  public static saveCache(requestCache) {
    if (requestCache) {
      requestCache.set(CacheHelper.LAST_UPDATE_TIME, moment());
      localStorage.setItem(SERVICES.__API_CACHE__, this.strMapToJson(requestCache));
    }
  }

  public static loadCache(): Map<string, any> {
    const localCache = localStorage.getItem(SERVICES.__API_CACHE__);
    if (localCache) {
      return this.jsonToStrMap(localCache);
    }
    return new Map();
  }

  public static clearCache() {
    localStorage.removeItem(SERVICES.__API_CACHE__);
  }

  public static validateCache(cacheStatus) {
    const newUpdateTime = cacheStatus.lastUpdateTime;
    const requestCache = CacheHelper.loadCache();

    const lastUpdateTime = requestCache.get(CacheHelper.LAST_UPDATE_TIME);

    if (!lastUpdateTime || newUpdateTime > lastUpdateTime) {
      CacheHelper.clearCache();
      return true;
    }
    return false;
  }

  public static getSalesLibraryStatus() {
    const salesLibraryStatus = localStorage.getItem(SERVICES.__SALES_LIBRARY_STATUS__);
    return salesLibraryStatus ? JSON.parse(salesLibraryStatus) : {};
  }
  public static setSignature(signature) {
    const salesLibraryStatus = {
      signature,
      needUpdate: false
    };
    localStorage.setItem(SERVICES.__SALES_LIBRARY_STATUS__, JSON.stringify(salesLibraryStatus));
  }
  public static setNeedUpdate(needUpdate) {
    let salesLibraryStatus = CacheHelper.getSalesLibraryStatus();
    salesLibraryStatus.needUpdate = needUpdate;

    localStorage.setItem(SERVICES.__SALES_LIBRARY_STATUS__, JSON.stringify(salesLibraryStatus));
  }
}
