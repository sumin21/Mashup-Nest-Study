import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { StatusDto } from './dto/status.dto';
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

  getOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.users = this.users.filter((user) => user.id !== id);
  }

  create(userData: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
    return this.users;
  }

  status(statusData: StatusDto) {
    return `(After DTO) status is ${statusData}`;
  }
}
