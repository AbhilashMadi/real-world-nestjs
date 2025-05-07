import 'fastify';
import { UserEntity } from '~/user/user.entity';

declare module 'http' {
  interface IncomingMessage {
    user?: UserEntity | null;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: UserEntity | null;
  }
}
