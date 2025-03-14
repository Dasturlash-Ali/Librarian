import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orderId = parseInt(request.params.id);

    if (!orderId || !user) {
      throw new ForbiddenException('Ruxsat yoq');
    }

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        cart: true,
      },
    });

    if (!order || order.cart.user_id !== user.id) {
      throw new ForbiddenException('Bu buyurtmani korish huquqiga ega emassiz');
    }

    return true;
  }
}
