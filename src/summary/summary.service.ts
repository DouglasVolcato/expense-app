import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .map((report) => report.amount)
      .reduce((a, b) => a + b);

    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .map((report) => report.amount)
      .reduce((a, b) => a + b);

    return {
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
