import { Injectable } from '@nestjs/common';
import { CreateBookDiscountDto } from './dto/create-book_discount.dto';
import { UpdateBookDiscountDto } from './dto/update-book_discount.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookDiscountService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createBookDiscountDto: CreateBookDiscountDto) {
    return this.prismaClientService.bookDiscount.create({
      data: {...createBookDiscountDto},
      include: {
        book: true,
        discount: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.bookDiscount.findMany({
      include: {
        book: true,
        discount: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.bookDiscount.findUnique({
      where: {id},
      include: {
        book: true,
        discount: true,
      }
    });
  }

  update(id: number, updateBookDiscountDto: UpdateBookDiscountDto) {
    return this.prismaClientService.bookDiscount.update({
      where: {id},
      data: updateBookDiscountDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.bookDiscount.delete({
      where: {id}
    });
  }
}
