import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor( private readonly prismaClientService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if(createCategoryDto.parent_id) {
      const parentCategory = await this.prismaClientService.category.findUnique({
        where: { id: createCategoryDto.parent_id }
      });

      if(!parentCategory) {
        throw new BadRequestException("Parent category topilmadi");
      }
    }

    return this.prismaClientService.category.create({
      data: {
        name: createCategoryDto.name,
        parent_id: createCategoryDto.parent_id || null,
      }
    });
  }

  findAll() {
    return this.prismaClientService.category.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.category.findUnique({
      where: {id}
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaClientService.category.update({
      where: {id},
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.category.delete({
      where: {id}
    });
  }
}
