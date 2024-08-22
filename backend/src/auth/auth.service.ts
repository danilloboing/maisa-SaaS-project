import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
    return {
      success: true,
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(token);
      if (!decoded.sub) {
        throw new Error('Invalid token');
      }

      const issuedAt = decoded.iat;
      const currentTime = Math.floor(Date.now() / 1000);
      const twelveHoursInSeconds = 12 * 60 * 60;

      if (currentTime - issuedAt > twelveHoursInSeconds) {
        throw new Error('Token expired');
      }

      const user = await this.usersRepository.findOne({
        where: { id: decoded.sub },
      });

      if (!user) {
        throw new Error('User not found');
      }
      return {
        status: true,
        success: true,
        user: this.formatUserData(user),
      };
    } catch (e) {
      return e;
    }
  }

  private formatUserData(user: User) {
    return {
      id: user.id,
      email: user.email,
      nome: user.nome,
    };
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      select: ['id', 'nome', 'email'],
    });
  }
}
