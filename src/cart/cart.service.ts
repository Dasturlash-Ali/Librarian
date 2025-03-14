import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createCartDto: CreateCartDto) {
    return this.prismaClientService.carts.create({
      data: {
        user_id: createCartDto.user_id,
        createddAt: createCartDto.createdAt
      },
      include: {
        user: true
      }
    });
  }

  findAll() {
    return this.prismaClientService.carts.findMany({
      include:{
        user: true
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.carts.findUnique({
      where: {id},
      include: {
        user: true
      }
    });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.prismaClientService.carts.update({
      where: {id},
      data: updateCartDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.carts.delete({
      where: {id}
    });
  }
}
