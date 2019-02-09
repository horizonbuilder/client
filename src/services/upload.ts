import BaseService from './baseService';
import { FileInfo as IFileInfo } from '../types';

export default class UploadService extends BaseService {
  static uploadUrl = SERVICES.UPLOAD;

  public static async uploadFile(name: string, type: string): Promise<IFileInfo> {
    let route = this.buildRoute(this.uploadUrl, { name: name, type: type });
    return await this.getRequest<IFileInfo>(route);
  }
}
