import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';
import {
  CreateReportDto,
  PutReportDto,
  ReportResponseDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  postReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.postReport(reportType, body);
  }

  @Put(':id')
  putReport(
    @Body() body: PutReportDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.appService.putReport(body, id);
  }

  // @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string): ReportResponseDto {
    return this.appService.deleteReport(id);
  }
}
