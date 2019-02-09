import { Client as IClient, ClientInput as IClientInput } from '../types';
import BaseService from './baseService';

export default class ClientService extends BaseService {
  static clientRoute = SERVICES.CLIENT;
  static clientsRoute = SERVICES.CLIENTS;
  static workfileClientRoute = SERVICES.WORKFILE_CLIENT;

  public static async getClients(): Promise<Array<IClient>> {
    return await this.getRequest<Array<IClient>>(this.clientRoute, true);
  }

  public static async getClient(id: number): Promise<IClient> {
    return await this.getRequest<IClient>(
      this.buildRoute(this.clientsRoute, { client_id: id }),
      true
    );
  }

  public static async createClient(client: IClientInput): Promise<IClient> {
    return await this.postJSONRequest<IClientInput, IClient>(this.clientRoute, client);
  }

  public static async createWorkfileClient(
    workfileId: number | string,
    client: IClientInput
  ): Promise<IClient> {
    let route = this.buildRoute(this.workfileClientRoute, { workfile_id: workfileId });
    return await this.postJSONRequest<IClientInput, IClient>(route, client);
  }

  public static async getWorkfileClient(workfileId: number | string): Promise<IClient> {
    return await this.getRequest<IClient>(
      this.buildRoute(this.workfileClientRoute, { workfile_id: workfileId })
    );
  }

  public static async updateWorkfileClient(
    client: IClientInput,
    workfileId: number | string,
    clientId: number | string
  ): Promise<IClient> {
    return await this.putJSONRequest<IClientInput, IClient>(
      this.buildRoute(this.workfileClientRoute, { workfile_id: workfileId, client_id: clientId }),
      client
    );
  }

  public static async removeClient(id: number | string): Promise<IClient> {
    return await this.deleteRequest<IClient>(this.buildRoute(this.clientsRoute, { client_id: id }));
  }
}
