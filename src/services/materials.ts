import { Material as IMaterial, MaterialInput as IMaterialInput } from '../types';
import BaseService from './baseService';

export default class MaterialsService extends BaseService {
  static materialsRoute = SERVICES.MATERIALS;
  static materialRoute = SERVICES.MATERIAL;

  static requestCache: Map<string, Array<IMaterial> | IMaterial> = new Map();

  public static async getMaterials(
    job_id: string | number,
    service_id: string | number
  ): Promise<Array<IMaterial>> {
    return await this.getRequest<Array<IMaterial>>(
      this.buildRoute(this.materialsRoute, { job_id, service_id })
    );
  }

  public static async createMaterial(
    job_id: string | number,
    service_id: string | number,
    material: IMaterialInput
  ): Promise<IMaterial> {
    return await this.postJSONRequest<IMaterialInput, IMaterial>(
      this.buildRoute(this.materialsRoute, { job_id, service_id }),
      material
    );
  }

  public static async updateMaterial(job_id: number, material: IMaterial): Promise<IMaterial> {
    return await this.putJSONRequest<IMaterial, IMaterial>(
      this.buildRoute(this.materialRoute, { job_id, material_id: material.id }),
      material
    );
  }

  public static async deleteMaterial(job_id: number, material_id: number): Promise<string> {
    return await this.deleteRequest<string>(
      this.buildRoute(this.materialRoute, { job_id, material_id })
    );
  }
}
