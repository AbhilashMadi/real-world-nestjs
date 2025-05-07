import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { IUserResponse } from '~/types/user-response.interface';
import { UserService } from '~/user/user.service';
import CreateUserDto from '~/user/dto/create-user.dto';
import LoginUserDto from '~/user/dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildResponse(user);
  }

  @Get('/user')
  async getUser() {
    return 'user ---';
  }
}
