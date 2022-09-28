import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllIncomeReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report
      .filter((report) => report.type === reportType && report.id === id)
      .find((report) => report.id === id);
  }

  @Post('')
  postReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

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

  @Put(':id')
  putReport(
    @Body() body: { source?: string; amount?: number },
    @Param('id') id: string,
  ) {
    const reportToUpdate = data.report.find((report) => report.id === id);
    const update = Object.assign(reportToUpdate, body);

    data.report.splice(data.report.indexOf(reportToUpdate), 1, update);

    return update;
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportToDelete = data.report.find((report) => report.id === id);

    data.report.splice(data.report.indexOf(reportToDelete), 1);

    return reportToDelete;
  }
}
