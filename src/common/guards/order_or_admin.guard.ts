import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderOrAdminGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orderId = request.body.orderId || request.params.id;

    if (!user) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    if (user.is_creator || user.isAdmin) {
      return true;
    }

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        cart: {
          user_id: user.id,
        },
      },
    });

    if (!order) {
      throw new ForbiddenException('Sizga bu buyurtmaga ruxsat berilmagan');
    }

    return true;
  }
}
