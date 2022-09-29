import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // HttpCode,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  postReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.postReport(reportType, body);
  }

  @Put(':id')
  putReport(
    @Body() body: { source?: string; amount?: number },
    @Param('id') id: string,
  ) {
    return this.appService.putReport(body, id);
  }

  // @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}

//1:23
