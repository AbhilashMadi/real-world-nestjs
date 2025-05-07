import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import CreateuserDto from '~/user/dto/create-user.dto';
import { UserEntity } from '~/user/user.entity';
import { IUserResponse } from '~/types/user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateuserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();
    Object.assign(userEntity, createUserDto);
    return await this.userRepository.save(userEntity);
  }

  generateJwtToken(user: UserEntity): string {
    const secret = this.configService.get<string>('JWT_SECRET')!;
    return sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      secret,
      { expiresIn: '1d' },
    );
  }

  buildResponse(user: UserEntity): IUserResponse {
    const { password, ...rest } = user;
    return { user: { ...rest, token: this.generateJwtToken(user) } };
  }
}
