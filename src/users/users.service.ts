import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'test1',
      age: 10,
    },
  ];

  getAll(): User[] {
    return this.users;
  }
}
