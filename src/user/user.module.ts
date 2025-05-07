import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '~/user/user.entity';
import { UserService } from '~/user/user.service';
import { UsersController } from '~/user/users.controller';
import { UserController } from '~/user/user.controller';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController, UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
