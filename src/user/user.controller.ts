import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { UserService } from '~/user/user.service';
import { User } from '~/user/decorators/user.decorator';
import { UserEntity } from '~/user/user.entity';
import { AuthGuard } from '~/user/guards/auth.guard';
import UpdateUserDto from './dto/update-user.dto';
import { IUserResponse } from '~/types/user-response.interface';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Request() request: FastifyRequest, @User() user: UserEntity) {
    return request.raw.user;
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateUser(
    @Body('user') UpdateUserDto: UpdateUserDto,
    @User('id') userId: number,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUserById(userId, UpdateUserDto);
    return this.userService.buildResponse(user);
  }
}
