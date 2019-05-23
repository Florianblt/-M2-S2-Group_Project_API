import { createParamDecorator } from '@nestjs/common';
import { User } from '../modules/users/users.entity';

export const CurrentUser = createParamDecorator(
  (data: any, req: any): User => {
    return req.user;
  },
);
