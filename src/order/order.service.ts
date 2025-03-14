import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaClientService.order.create({
      data: {...createOrderDto},
      include: {
        cart: true,
        orderItems: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.order.findMany({
      include: {
        cart: true,
        orderItems: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.order.findUnique({
      where: {id},
      include: {
        cart: true,
        orderItems: true,
      }
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prismaClientService.order.update({
      where: {id},
      data: updateOrderDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.order.delete({
      where: {id}
    });
  }
}
