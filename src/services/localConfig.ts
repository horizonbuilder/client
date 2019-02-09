import { get, set } from 'lodash';

export default class LocalConfigService {
  public static getConfig(key: string) {
    const localConfig = LocalConfigService.loadConfig();
    return get(localConfig, key);
  }

  public static setConfig(key: string, data: any) {
    let localConfig = LocalConfigService.loadConfig();
    set(localConfig, key, data);
    LocalConfigService.saveConfig(localConfig);
  }

  private static loadConfig() {
    let localConfig;
    try {
      localConfig = JSON.parse(localStorage.getItem('localConfig'));
      if (!localConfig) throw new Error();
    } catch (e) {
      localConfig = {
        compSales: {
          map: {},
          filters: {},
          settings: {}
        },
        salesFilters: {
          state: []
        }
      };
      localStorage.setItem('localConfig', JSON.stringify(localConfig));
    }
    return localConfig;
  }

  private static saveConfig(config) {
    localStorage.setItem('localConfig', JSON.stringify(config));
  }
}
