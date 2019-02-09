import BaseService from './baseService';

export default class PdfService extends BaseService {
  static pdfRoute = SERVICES.REPORT_PDF;

  public static async generatePdf(workfile_id: number | string) {
    try {
      const response = await fetch(
        this.serviceUrl(
          this.buildRoute(
            PdfService.pdfRoute,
            {workfile_id: workfile_id}
          )
        ), {
          headers: {
            ...this.authHeader()
          }
        });

      const parsedResponse = await response.blob();

      const file = new Blob(
        [parsedResponse],
        {type: 'application/pdf'});

      return file;
    } catch(err) {
      console.log(err);
      return null;
    }
  }
}
