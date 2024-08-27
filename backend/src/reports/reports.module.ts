import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';
import { ServicesService } from 'src/services/services.service';
import { CustomersService } from 'src/customers/customers.service';
import { AgendaService } from 'src/agenda/agenda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Agenda } from 'src/entities/agenda.entity';
import { Service } from 'src/entities/service.entity';
import { JwtModule } from '@nestjs/jwt';
import { PaymentsService } from 'src/payments/payments.service';
import { Payment } from 'src/entities/payments.entity';
import { SheetsService } from 'src/sheets/sheets.service';

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,
    BearerTokenGuard,
    ServicesService,
    CustomersService,
    AgendaService,
    PaymentsService,
    SheetsService,
  ],
  imports: [
    TypeOrmModule.forFeature([Customer, Agenda, Service, Payment]),
    JwtModule,
  ],
})
export class ReportsModule {}
