import { Trade as ITrade, TradeInput as ITradeInput } from '../types';
import BaseService from './baseService';

export default class TradesService extends BaseService {
  static tradesRoute = SERVICES.TRADES;
  static tradeRoute = SERVICES.TRADE;

  static requestCache: Map<string, Array<ITrade> | ITrade> = new Map();

  public static async getTrades(
    job_id: string | number,
    estimate_id: string | number
  ): Promise<Array<ITrade>> {
    return await this.getRequest<Array<ITrade>>(
      this.buildRoute(this.tradesRoute, { job_id, estimate_id })
    );
  }

  public static async getTrade(id: number): Promise<ITrade> {
    return await this.getRequest<ITrade>(this.buildRoute(this.tradeRoute, { trade_id: id }), true);
  }

  public static async createTrade(
    job_id: string | number,
    estimate_id: string | number,
    name: string
  ): Promise<ITrade> {
    return await this.postJSONRequest<ITradeInput, ITrade>(
      this.buildRoute(this.tradesRoute, { job_id, estimate_id }),
      { name }
    );
  }

  public static async updateTrade(id: number): Promise<ITrade> {
    return await this.putJSONRequest<any, ITrade>(
      this.buildRoute(this.tradeRoute, { trade_id: id }),
      {}
    );
  }

  public static async deleteTrade(id: number): Promise<string> {
    return await this.deleteRequest<string>(this.buildRoute(this.tradeRoute, { trade_id: id }));
  }
}
