import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, BearerTokenGuard],
  imports: [TypeOrmModule.forFeature([Payment]), JwtModule],
})
export class PaymentsModule {}
