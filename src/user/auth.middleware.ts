import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DoneFuncWithErrOrRes } from 'fastify/types/hooks';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { UserService } from '~/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(
    request: FastifyRequest,
    _reply: FastifyReply,
    done: DoneFuncWithErrOrRes,
  ) {
    try {
      const authHeader = request.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Token ')) {
        throw new UnauthorizedException(
          'Authorization token missing or invalid',
        );
      }

      const token = authHeader.split(' ')[1];
      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) {
        throw new ForbiddenException('JWT Secret is missing in the config');
      }

      let payload: any;
      try {
        payload = verify(token, secret);
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }

      // Verify user existence
      const user = await this.userService.findUserById(payload.id);
      if (!user) throw new UnauthorizedException('User not found');

      // Attach the user to the request object
      request.user = user;
      done();
    } catch (err) {
      // Log error (optional)
      console.error('Auth Middleware Error:', err);
      done(err); // Pass the error to the Fastify handler
    }
  }
}
