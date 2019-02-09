import {
  Service as IService,
  ServiceInput as IServiceInput,
  File as IFile,
  FileInput as IFileInput
} from '../types';
import BaseService from './baseService';

export default class ServicesService extends BaseService {
  static servicesRoute = SERVICES.SERVICES;
  static serviceRoute = SERVICES.SERVICE;

  static requestCache: Map<string, Array<IService> | IService> = new Map();

  public static async getServices(
    job_id: string | number,
    estimate_id: string | number
  ): Promise<Array<IService>> {
    return await this.getRequest<Array<IService>>(
      this.buildRoute(this.servicesRoute, { job_id, estimate_id })
    );
  }

  public static async getService(id: number): Promise<IService> {
    return await this.getRequest<IService>(
      this.buildRoute(this.serviceRoute, { service_id: id }),
      true
    );
  }

  public static async createService(
    job_id: string | number,
    estimate_id: string | number,
    service: IServiceInput
  ): Promise<IService> {
    return await this.postJSONRequest<IServiceInput, IService>(
      this.buildRoute(this.servicesRoute, { job_id, estimate_id }),
      service
    );
  }

  public static async updateService(id: number, service: IServiceInput): Promise<IService> {
    return await this.putJSONRequest<IServiceInput, IService>(
      this.buildRoute(this.serviceRoute, { service_id: id }),
      service
    );
  }

  public static async deleteService(id: number): Promise<string> {
    return await this.deleteRequest<string>(this.buildRoute(this.serviceRoute, { service_id: id }));
  }
}
