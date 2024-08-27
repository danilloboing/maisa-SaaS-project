import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BearerTokenGuard],
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ session: true }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
