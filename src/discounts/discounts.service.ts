import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DiscountsService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createDiscountDto: CreateDiscountDto) {
    return this.prismaClientService.discount.create({
      data: {...createDiscountDto}
    });
  }

  findAll() {
    return this.prismaClientService.discount.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.discount.findUnique({
      where: {id}
    });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.prismaClientService.discount.update({
      where: {id},
      data: updateDiscountDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.discount.delete({
      where: {id}
    });
  }
}
