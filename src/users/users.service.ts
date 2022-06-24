import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  //생성자 부분에 가져와 사용한다.
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  // getAll(): User[] {
  //   return this.users;
  // }
  createUser(userData: CreateUserDto): Promise<boolean> {
    return this.userRepository.onCreate(userData);
  }
  // mysql에 없는지 확인
  // 없다면 INSERT
  // 있다면 ERROR 409

  getUserAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findByUserOne(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }
  setUser(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userRepository.onChnageUser(id, updateUserDto);
  }
  deleteUser(id: number): Promise<boolean> {
    return this.userRepository.onDelete(id);
  }
}
