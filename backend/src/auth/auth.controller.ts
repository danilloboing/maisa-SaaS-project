import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(BearerTokenGuard)
  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );

    if (!user) {
      return { success: false, message: 'User or password incorrect' };
    }

    return this.authService.login(user);
  }
}
