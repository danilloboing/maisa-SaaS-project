import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { JwtModule } from '@nestjs/jwt';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, BearerTokenGuard],
  imports: [TypeOrmModule.forFeature([Service]), JwtModule],
})
export class ServicesModule {}
