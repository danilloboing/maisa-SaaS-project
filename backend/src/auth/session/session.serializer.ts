import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error | null, id?: number) => void) {
    console.log('Serializing user:', user);
    done(null, user.id);
  }

  async deserializeUser(
    id: number,
    done: (err: Error | null, user?: User) => void,
  ) {
    console.log('Deserializing user with id:', id);
    try {
      const user = await this.usersService.findOne(id.toString());
      done(null, user);
    } catch (error) {
      console.error('Error during deserialization:', error);
      done(error);
    }
  }
}
