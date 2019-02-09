import { Labor as ILabor, LaborInput as ILaborInput } from '../types';
import BaseService from './baseService';

export default class LaborsService extends BaseService {
  static laborsRoute = SERVICES.LABORS;
  static laborRoute = SERVICES.LABOR;

  public static async getLabor(
    job_id: string | number,
    service_id: string | number
  ): Promise<Array<ILabor>> {
    return await this.getRequest<Array<ILabor>>(
      this.buildRoute(this.laborsRoute, { job_id, service_id })
    );
  }

  public static async createLabor(
    job_id: string | number,
    service_id: string | number,
    labor: ILaborInput
  ): Promise<ILabor> {
    return await this.postJSONRequest<ILaborInput, ILabor>(
      this.buildRoute(this.laborsRoute, { job_id, service_id }),
      labor
    );
  }

  public static async updateLabor(job_id: number, labor: ILabor): Promise<ILabor> {
    return await this.putJSONRequest<ILabor, ILabor>(
      this.buildRoute(this.laborRoute, { job_id, labor_id: labor.id }),
      labor
    );
  }

  public static async deleteLabor(job_id: number, labor_id: number): Promise<string> {
    return await this.deleteRequest<string>(this.buildRoute(this.laborRoute, { job_id, labor_id }));
  }
}
