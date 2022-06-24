import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { UsersMiddleware } from './middlewares/users.middleware';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])], //UserRepository 등록
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
