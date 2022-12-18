import { JWT_SECRET } from '@app/config';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' '[1]).toString();
    // console.log('token: ', token);

    try {
      console.log('token1: ', token);
      const decode = verify(token, JWT_SECRET);
      console.log('token2: ', token);
      console.log('decode: ', decode);
      req.user = await this.userService.findById(decode.id);
      next();
    } catch (err) {
      console.log(err);
      req.user = null;
      next();
    }
  }
}
