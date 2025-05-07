import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import CreateuserDto from '~/user/dto/create-user.dto';
import { UserEntity } from '~/user/user.entity';
import { IUserResponse } from '~/types/user-response.interface';
import LoginUserDto from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateuserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    const userByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Username or Email already taken.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const userEntity = new UserEntity();
    Object.assign(userEntity, createUserDto);
    return await this.userRepository.save(userEntity);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const userByEmail = await this.userRepository.findOneBy({ email });

    if (!userByEmail) {
      throw new HttpException(
        `User with ${email} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = await userByEmail.comparePassword(password);

    if (!isPasswordValid) {
      throw new HttpException(`Invalid password.`, HttpStatus.BAD_REQUEST);
    }

    return userByEmail;
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
