import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllIncomeReports() {
    return {};
  }
  @Get(':id')
  getIncomeReportById() {
    return {};
  }
  @Post('')
  postIncomeReport() {
    return {};
  }
  @Put(':id')
  putIncomeReport() {
    return {};
  }
  @Delete(':id')
  deleteIncomeReport() {
    return {};
  }
}
