import { Injectable } from '@nestjs/common';
import { CreateCategoryAuthorDto } from './dto/create-category_author.dto';
import { UpdateCategoryAuthorDto } from './dto/update-category_author.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryAuthorService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createCategoryAuthorDto: CreateCategoryAuthorDto) {
    return this.prismaClientService.categoryAuthor.create({
      data: {...createCategoryAuthorDto},
      include: {
        author: true,
        category: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.categoryAuthor.findMany({
      include: {
        author: true,
        category: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.categoryAuthor.findUnique({
      where: {id},
      include: {
        author: true,
        category: true,
      }
    });
  }

  update(id: number, updateCategoryAuthorDto: UpdateCategoryAuthorDto) {
    return this.prismaClientService.categoryAuthor.update({
      where: {id},
      data: updateCategoryAuthorDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.categoryAuthor.delete({
      where: {id}
    });
  }
}
