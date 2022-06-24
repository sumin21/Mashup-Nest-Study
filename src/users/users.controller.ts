import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/users.entity';

import { UsersService } from './users.service';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() userData: CreateUserDto): Promise<boolean> {
    console.log('kk');
    return this.usersService.createUser(userData);
  }

  @Get()
  getUserAll(): Promise<User[]> {
    return this.usersService.getUserAll();
  }

  @Get('/:id')
  findByUserOne(@Param('id', ParseUUIDPipe) id: number): Promise<User> {
    return this.usersService.findByUserOne(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  setUser(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.usersService.setUser(id, updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}
