import {
  Job as IJob,
  JobInput as IJobInput,
  File as IFile,
  FileInput as IFileInput
} from '../types';
import BaseService from './baseService';

export default class JobsService extends BaseService {
  static jobsRoute = SERVICES.JOBS;
  static jobRoute = SERVICES.JOB;
  static jobFilesRoute = SERVICES.JOB_FILES;
  static jobFileRoute = SERVICES.JOB_FILE;

  static requestCache: Map<string, Array<IJob> | IJob> = new Map();

  public static async getJobs(): Promise<Array<IJob>> {
    return await this.getRequest<Array<IJob>>(this.jobsRoute, true);
  }

  public static async getJob(id: number): Promise<IJob> {
    return await this.getRequest<IJob>(this.buildRoute(this.jobRoute, { job_id: id }), true);
  }

  public static async createJob(job: IJobInput): Promise<IJob> {
    return await this.postJSONRequest<IJobInput, IJob>(this.jobsRoute, job);
  }

  public static async updateJob(id: number, job: IJobInput): Promise<IJob> {
    return await this.putJSONRequest<IJobInput, IJob>(
      this.buildRoute(this.jobRoute, { job_id: id }),
      job
    );
  }

  public static async deleteJob(id: number): Promise<string> {
    return await this.deleteRequest<string>(this.buildRoute(this.jobRoute, { job_id: id }));
  }

  public static async getFiles(job_id: number): Promise<Array<IFile>> {
    let route = this.buildRoute(this.jobFilesRoute, { job_id });
    return this.getRequest<Array<IFile>>(route);
  }

  public static async createFile(job_id: number, file: IFileInput): Promise<IFile> {
    let route = this.buildRoute(this.jobFilesRoute, { job_id });
    return this.postJSONRequest<IFileInput, IFile>(route, file);
  }

  public static async updateFile(
    job_id: number,
    file_id: number,
    file: IFileInput
  ): Promise<IFile> {
    let route = this.buildRoute(this.jobFileRoute, { job_id, file_id });
    return this.putJSONRequest<IFileInput, IFile>(route, file);
  }

  public static async deleteFile(job_id: number, file_id: number): Promise<void> {
    let route = this.buildRoute(this.jobFileRoute, { job_id, file_id });
    return this.deleteRequest<void>(route);
  }
}
