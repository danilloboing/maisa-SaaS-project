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

  @Get('agenda')
  async getAgendaReport(@Res() res: Response, @Body() dto: AgendaReportDto) {
    const file = await this.reportsService.getAgendaReport(dto);

    res.download(`${file}`);
  }

  @Get('balance')
  async getBalanceReport(@Res() res: Response, @Body() dto: BalanceReportDto) {
    const file = await this.reportsService.getBalanceReport(dto);

    res.download(`${file}`);
  }

  @Get('customers')
  async getCustomersReport(@Res() res: Response) {
    const file = await this.reportsService.getCustomersReport();

    res.download(`${file}`);
  }

  @Get('services')
  async getServicesReport(@Res() res: Response) {
    const file = await this.reportsService.getServicesReport();

    res.download(`${file}`);
  }
}
