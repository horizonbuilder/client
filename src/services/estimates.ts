import { Estimate as IEstimate, File as IFile, FileInput as IFileInput } from '../types';
import BaseService from './baseService';

export default class EstimatesService extends BaseService {
  static estimatesRoute = SERVICES.ESTIMATES;
  static estimateRoute = SERVICES.ESTIMATE;
  static totalCostRoute = SERVICES.TOTAL_COST;

  public static async getEstimates(job_id: number): Promise<Array<IEstimate>> {
    return await this.getRequest<Array<IEstimate>>(
      this.buildRoute(this.estimatesRoute, { job_id })
    );
  }

  public static async getEstimate(id: number): Promise<IEstimate> {
    return await this.getRequest<IEstimate>(
      this.buildRoute(this.estimateRoute, { estimate_id: id }),
      true
    );
  }

  public static async createEstimate(job_id: number): Promise<IEstimate> {
    return await this.postJSONRequest<any, IEstimate>(
      this.buildRoute(this.estimatesRoute, { job_id }),
      {}
    );
  }

  public static async updateEstimate(id: number): Promise<IEstimate> {
    return await this.putJSONRequest<any, IEstimate>(
      this.buildRoute(this.estimateRoute, { estimate_id: id }),
      {}
    );
  }

  public static async deleteEstimate(id: number): Promise<string> {
    return await this.deleteRequest<string>(
      this.buildRoute(this.estimateRoute, { estimate_id: id })
    );
  }

  public static async getTotalCost(
    job_id: number | string,
    estimate_id: number | string
  ): Promise<number> {
    return await this.getRequest<number>(
      this.buildRoute(this.totalCostRoute, { job_id, estimate_id })
    );
  }
}
