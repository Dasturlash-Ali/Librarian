import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartItemService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.prismaClientService.cartItem.create({
      data: {...createCartItemDto},
      include: {
        cart: true,
        book: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.cartItem.findMany({
      include: {
        cart: true,
        book: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.cartItem.findUnique({
      where: {id},
      include: {
        cart: true,
        book: true,
      }
    });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this.prismaClientService.cartItem.update({
      where: {id},
      data: updateCartItemDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.cartItem.delete({
      where: {id}
    });
  }
}
