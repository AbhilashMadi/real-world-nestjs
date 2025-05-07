import { Controller, Get, Request } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserService } from '~/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Request() request: FastifyRequest) {
    return request.raw.user;
  }
}
