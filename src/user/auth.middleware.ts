import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DoneFuncWithErrOrRes } from 'fastify/types/hooks';
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

      const token = authHeader?.startsWith('Token ')
        ? authHeader.split(' ')[1]
        : null;
      const secret = this.configService.get<string>('JWT_SECRET');

      if (token && secret) {
        const payload = verify(token, secret) as { id: number };

        const user = await this.userService.findUserById(payload.id);
        request.user = user || null;
      } else {
        request.user = null;
      }

      done();
    } catch (err) {
      request.user = null;
      done(); // Do NOT pass the error — guards will handle access
    }
  }
}
