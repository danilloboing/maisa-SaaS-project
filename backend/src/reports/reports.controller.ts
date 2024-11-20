import { Body, Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

import { BalanceReportDto } from './dto/balance-report.dto';
import { AgendaReportDto } from './dto/agenda-report.dto';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';

@Controller('reports')
@UseGuards(BearerTokenGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('agenda-xlsx')
  async getAgendaReportXlsx(
    @Res() res: Response,
    @Body() dto: AgendaReportDto,
  ) {
    const file = await this.reportsService.getAgendaReportXlsx(dto);

    res.download(`${file}`);
  }

  @Get('balance-xlsx')
  async getBalanceReportXlsx(
    @Res() res: Response,
    @Body() dto: BalanceReportDto,
  ) {
    const file = await this.reportsService.getBalanceReportXlsx(dto);

    res.download(`${file}`);
  }

  @Get('customers-xlsx')
  async getCustomersReportXlsx(@Res() res: Response) {
    const file = await this.reportsService.getCustomersReportXlsx();

    res.download(`${file}`);
  }

  @Get('services-xlsx')
  async getServicesReportXlsx(@Res() res: Response) {
    const file = await this.reportsService.getServicesReportXlsx();

    res.download(`${file}`);
  }

  @Get('services')
  async getServicesReport() {
    return this.reportsService.getDoneServicesReport();
  }

  @Get('services-by-category')
  async getServicesByCategoryReport() {
    return this.reportsService.getServicesByCategoryReport();
  }

  @Get('revenue')
  async getRevenueReport() {
    return this.reportsService.getRevenueReport();
  }

  @Get('revenue-by-month')
  async getMonthlyRevenueReport() {
    return this.reportsService.getMonthlyRevenueReport();
  }

  @Get('services-by-status')
  async getServicesByStatusReport() {
    return this.reportsService.getServicesByStatusReport();
  }
}
