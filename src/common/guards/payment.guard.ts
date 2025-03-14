import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paymentId = +request.params.id;

    const payment = await this.prisma.payments.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.user_id !== user.id) {
      throw new ForbiddenException('Siz bu paymentga kirish huquqiga ega emassiz');
    }

    return true;
  }
}
