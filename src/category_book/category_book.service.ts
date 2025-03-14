import { Injectable } from '@nestjs/common';
import { CreateCategoryBookDto } from './dto/create-category_book.dto';
import { UpdateCategoryBookDto } from './dto/update-category_book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryBookService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createCategoryBookDto: CreateCategoryBookDto) {
    return this.prismaClientService.categoryBook.create({
      data: {...createCategoryBookDto},
      include: {
        book: true,
        category: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.categoryBook.findMany({
      include: {
        book: true,
        category: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.categoryBook.findUnique({
      where: {id},
      include: {
        book: true,
        category: true,
      }
    });
  }

  update(id: number, updateCategoryBookDto: UpdateCategoryBookDto) {
    return this.prismaClientService.categoryBook.update({
      where: {id},
      data: updateCategoryBookDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.categoryBook.delete({
      where: {id}
    });
  }
}
