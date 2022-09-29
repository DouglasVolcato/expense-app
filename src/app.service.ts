import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AppService {
  getAllReports(reportType: ReportType) {
    return data.report.filter((report) => report.type === reportType);
  }

  getReportById(reportType: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === reportType && report.id === id)
      .find((report) => report.id === id);
  }

  postReport(reportType: ReportType, body: { source: string; amount: number }) {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };

    data.report.push(newReport);

    return newReport;
  }

  putReport(body: { source?: string; amount?: number }, id: string) {
    const reportToUpdate = data.report.find((report) => report.id === id);
    const update = Object.assign(reportToUpdate, body);

    data.report.splice(data.report.indexOf(reportToUpdate), 1, update);

    return update;
  }

  deleteReport(id: string) {
    const reportToDelete = data.report.find((report) => report.id === id);

    data.report.splice(data.report.indexOf(reportToDelete), 1);

    return reportToDelete;
  }
}
