import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentsMethod, PaymentsStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.prismaClientService.payments.create({
      data: {
        user_id: createPaymentDto.user_id,
        cart_item_id: createPaymentDto.cart_item_id,
        payment_method: createPaymentDto.payment_method || PaymentsMethod,
        status: createPaymentDto.status || PaymentsStatus,
        createdAt: createPaymentDto.createdAt,
        order_id: createPaymentDto.order_id,
      },
      include: {
        user: true,
        cartItem: true,
        order: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.payments.findMany({
      include: {
        user: true,
        cartItem: true,
        order: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.payments.findUnique({
      where: {id},
      include: {
        user: true,
        cartItem: true,
        order: true,
      }
    });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaClientService.payments.update({
      where: {id},
      data: updatePaymentDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.payments.delete({
      where: {id}
    });
  }
}
