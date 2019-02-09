import { User } from '../types/Users';

import BaseService from './baseService';

export default class UsersService extends BaseService {
  static usersRoute = SERVICES.USERS;

  public static async getUsersByRegion(region_id: string | number): Promise<Array<User>> {
    return await this.getRequest<Array<User>>(
      this.buildQueryRoute(this.usersRoute, { region_id })
    );
  }

  public static async getUsersByOrganization(organization_id: number): Promise<Array<User>> {
    return await this.getRequest<Array<User>>(
      this.buildQueryRoute(this.usersRoute, { organization_id })
    );
  }

  public static async getUsers(): Promise<Array<User>> {
    return await this.getRequest<Array<User>>(
      this.buildRoute(this.usersRoute, {})
    );
  }
}
