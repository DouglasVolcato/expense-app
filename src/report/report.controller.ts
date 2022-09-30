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
import { ReportType } from '../data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  PutReportDto,
  ReportResponseDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getReportById(reportType, id);
  }

  @Post('')
  postReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.postReport(reportType, body);
  }

  @Put(':id')
  putReport(
    @Body() body: PutReportDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.putReport(body, id);
  }

  // @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string): ReportResponseDto {
    return this.reportService.deleteReport(id);
  }
}
