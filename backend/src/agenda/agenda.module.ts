import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from 'src/entities/agenda.entity';
import { JwtModule } from '@nestjs/jwt';
import { ServicesService } from 'src/services/services.service';
import { PaymentsService } from 'src/payments/payments.service';
import { Service } from 'src/entities/service.entity';
import { Payment } from 'src/entities/payments.entity';
import { Customer } from 'src/entities/customer.entity';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  controllers: [AgendaController],
  providers: [
    AgendaService,
    ServicesService,
    PaymentsService,
    CustomersService,
    BearerTokenGuard,
  ],
  imports: [
    TypeOrmModule.forFeature([Agenda, Service, Payment, Customer]),
    JwtModule,
  ],
})
export class AgendaModule {}
