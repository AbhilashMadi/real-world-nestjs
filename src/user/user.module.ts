import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '~/user/user.controller';
import { UserEntity } from '~/user/user.entity';
import { UserService } from '~/user/user.service';
import { UsersController } from '~/user/users.controller';
import { AuthGuard } from '~/user/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController, UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
