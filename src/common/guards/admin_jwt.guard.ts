import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.refresh_token;

    if (!token) {
      throw new UnauthorizedException('Token mavjud emas');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token yaroqsiz');
    }
  }
}
