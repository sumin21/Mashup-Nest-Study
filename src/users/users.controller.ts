import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { StatusDto } from './dto/status.dto';

import { User } from './entities/user.entity';
import { HttpExceptionFilter } from './exceptionfilters/status.exceptionfilter';
import { StatusGuard } from './guards/status.guard';
import { StatusInterceptor } from './interceptors/status.interceptor';
import { StatusPipe } from './pipes/status.pipe';
import { UsersService } from './users.service';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get('error')
  async getError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  getOne(@Param('id') userId: number): User {
    console.log(userId);
    return this.usersService.getOne(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Delete(':id')
  remove(@Param('id') userId: number) {
    return this.usersService.deleteOne(userId);
  }

  @Post('status')
  @Roles('admin')
  @UseGuards(StatusGuard)
  @UseInterceptors(StatusInterceptor)
  @UseFilters(HttpExceptionFilter)
  status(@Body(StatusPipe) statusData: StatusDto) {
    console.log('pass handler...');
    return this.usersService.status(statusData);
  }
}
