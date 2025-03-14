import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.prismaClientService.orderItems.create({
      data: {
        ...createOrderItemDto,
        discount_id: createOrderItemDto.discount_id || 0
      },
      include: {
        cartItem: true,
        delivery: true,
        discount: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.orderItems.findMany({
      include: {
        cartItem: true,
        delivery: true,
        discount: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.orderItems.findUnique({
      where: {id},
      include: {
        cartItem: true,
        delivery: true,
        discount: true,
      }
    });
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.prismaClientService.orderItems.update({
      where: {id},
      data: updateOrderItemDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.orderItems.delete({
      where: {id}
    });
  }
}
