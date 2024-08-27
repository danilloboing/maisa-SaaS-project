import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ServicesModule } from './services/services.module';
import { FinanceModule } from './finance/finance.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpModule } from '@nestjs/axios';
import { AgendaModule } from './agenda/agenda.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';
import { SheetsService } from './sheets/sheets.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    CustomersModule,
    ServicesModule,
    FinanceModule,
    AuthModule,
    UsersModule,
    HttpModule,
    AgendaModule,
    PaymentsModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    SheetsService,
  ],
})
export class AppModule {}
