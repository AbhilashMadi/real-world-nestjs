import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '~/user/user.entity';

export const User = createParamDecorator(
  (property: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.raw.user;

    if (!user) return null;
    return property ? user[property] : user;
  },
);
