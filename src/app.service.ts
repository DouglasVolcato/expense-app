import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common/decorators';
import { ReportResponseDto } from './dtos/report.dto';

@Injectable()
export class AppService {
  getAllReports(reportType: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === reportType)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(reportType: ReportType, id: string): ReportResponseDto {
    return new ReportResponseDto(
      data.report
        .filter((report) => report.type === reportType && report.id === id)
        .find((report) => report.id === id),
    );
  }

  postReport(
    reportType: ReportType,
    body: { source: string; amount: number },
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  putReport(
    body: { source?: string; amount?: number },
    id: string,
  ): ReportResponseDto {
    const reportToUpdate = data.report.find((report) => report.id === id);
    const update = Object.assign(reportToUpdate, body);

    data.report.splice(data.report.indexOf(reportToUpdate), 1, update);

    return new ReportResponseDto(update);
  }

  deleteReport(id: string): ReportResponseDto {
    const reportToDelete = data.report.find((report) => report.id === id);

    data.report.splice(data.report.indexOf(reportToDelete), 1);

    return new ReportResponseDto(reportToDelete);
  }
}
