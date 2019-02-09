import {
  Report as IReport,
  ReportNew as IReportNew,
  ReportInput as IReportInput,
  ReportNew
} from '../types/Report';
const uuidv4 = require('uuid/v4');
import BaseService from './baseService';

export default class ReportsService extends BaseService {
  static reportsRoute = SERVICES.WORKFILE_REPORTS;
  static reportTemplatesRoute = SERVICES.REPORT_TEMPLATES;
  static reportTemplateRoute = SERVICES.REPORT_TEMPLATE;

  static requestCache: Map<string, Array<IReport> | IReport> = new Map();

  public static async getReport(workfile_id: number | string): Promise<IReportNew> {
    try {
      var reports = await this.getRequest<Array<IReport>>(
        this.buildRoute(this.reportsRoute, { workfile_id: workfile_id }),
        false
      );
      let reportObj: ReportNew = JSON.parse(reports[0].report);
      if (Array.isArray(reportObj.sections)) {
        return reportObj;
      }
      throw new Error('Invalid format of Report');
    } catch (err) {
      return {
        sections: [
          {
            id: uuidv4(),
            title: 'Default section',
            pages: [
              {
                id: uuidv4(),
                items: []
              }
            ]
          }
        ],
        error: err
      };
    }
  }

  public static async createReport(
    workfile_id: number | string,
    report: IReportInput
  ): Promise<IReport> {
    let route = this.buildRoute(this.reportsRoute, {
      workfile_id: workfile_id
    });
    return await this.postJSONRequest<IReportInput, IReport>(route, report);
  }

  public static async createTemplate(type: string, data: any): Promise<any> {
    return await this.postJSONRequest<any, any>(this.reportTemplatesRoute, { type, data });
  }

  public static async updateTemplate(type: string, template_id: number | string, data: any): Promise<any> {
    let route = this.buildRoute(this.reportTemplateRoute, {template_id});
    const templateData = {
      type,
      data
    };
    return await this.putJSONRequest<any, any>(route, templateData);
  }

  public static async getTemplates(type: string): Promise<any> {
    return await this.getRequest<any>(`${this.reportTemplatesRoute}?type=${type}`);
  }

  public static async deleteTemplate(template_id: number | string): Promise<any> {
    let route = this.buildRoute(this.reportTemplateRoute, { template_id });
    return await this.deleteRequest<any>(route);
  }

  //
  // public static async updateReport(
  //   workfile_id: number | string,
  //   report_id: number | string,
  //   report: IReportInput
  // ): Promise<IReport> {
  //   let route = this.buildRoute(this.reportsRoute, {
  //     workfile_id: workfile_id,
  //     report_id: report_id
  //   });
  //   return await this.putJSONRequest<IReportInput, IReport>(route, report);
  // }

  // mock method: provide static data
  public static emulateGetReports(workfile_id: number | string): IReportNew {
    try {
      const report = {
        sections: [
          {
            id: uuidv4(),
            title: 'Default section',
            pages: [
              {
                id: uuidv4(),
                items: [{ id: uuidv4(), type: 'text', x: 0, y: 0, w: 12, h: 7, data: '<p>qwe</p>' }]
              }
            ]
          }
        ]
      };
      return report;
    } catch (err) {
      return {
        sections: [
          {
            id: uuidv4(),
            title: 'Default section',
            pages: []
          }
        ],
        error: err
      };
    }
  }
}
