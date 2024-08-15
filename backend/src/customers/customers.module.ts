import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from 'src/entities/customer.entity';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, BearerTokenGuard],
  imports: [TypeOrmModule.forFeature([Customer]), JwtModule],
})
export class CustomersModule {}
