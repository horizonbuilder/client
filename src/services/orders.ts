import { Order as IOrder, File as IFile, FileInput as IFileInput } from '../types';
import BaseService from './baseService';

export default class OrdersService extends BaseService {
  static ordersRoute = SERVICES.ORDERS;
  static orderRoute = SERVICES.ORDER;

  static requestCache: Map<string, Array<IOrder> | IOrder> = new Map();

  public static async getOrders(job_id: number): Promise<Array<IOrder>> {
    return await this.getRequest<Array<IOrder>>(
      this.buildRoute(this.ordersRoute, { job_id }),
      true
    );
  }

  public static async getOrder(id: number): Promise<IOrder> {
    return await this.getRequest<IOrder>(this.buildRoute(this.orderRoute, { order_id: id }), true);
  }

  public static async createOrder(): Promise<IOrder> {
    return await this.postJSONRequest<any, IOrder>(this.ordersRoute, {});
  }

  public static async updateOrder(id: number): Promise<IOrder> {
    return await this.putJSONRequest<any, IOrder>(
      this.buildRoute(this.orderRoute, { order_id: id }),
      {}
    );
  }

  public static async deleteOrder(id: number): Promise<string> {
    return await this.deleteRequest<string>(this.buildRoute(this.orderRoute, { order_id: id }));
  }
}
