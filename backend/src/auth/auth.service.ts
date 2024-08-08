import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: SignUpDto) {
    const hashedPassword = await argon.hash(userDto.password);

    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await argon.verify(user.password, pass);

    if (hashedPassword) {
      return this.usersService.formatUserData(user);
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id_user,
      name: user.name,
      email: user.email,
    };
    return {
      success: true,
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
