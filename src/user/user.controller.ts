import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { UserService } from '~/user/user.service';
import { User } from '~/user/decorators/user.decorator';
import { UserEntity } from '~/user/user.entity';
import { AuthGuard } from '~/user/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Request() request: FastifyRequest, @User() user: UserEntity) {
    return request.raw.user;
  }
}
