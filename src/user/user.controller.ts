import { Body, Controller, Post } from '@nestjs/common';

import { IUserResponse } from '~/types/user-response.interface';
import CreateUserDto from '~/user/dto/create-user.dto';
import { UserService } from '~/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildResponse(user);
  }
}
