import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: SignUpDto) {
    return await this.userRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  public formatUserData(user: User) {
    return {
      id: user.id_user,
      email: user.email,
      name: user.name,
    };
  }
}
