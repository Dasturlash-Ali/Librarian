import { Injectable } from '@nestjs/common';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LangService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createLangDto: CreateLangDto) {
    return this.prismaClientService.lang.create({
      data: {
        lang_name: createLangDto.lang_name
      }
    });
  }

  findAll() {
    return this.prismaClientService.lang.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.lang.findUnique({
      where: {id}
    });
  }

  update(id: number, updateLangDto: UpdateLangDto) {
    return this.prismaClientService.lang.update({
      where: {id},
      data: updateLangDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.lang.delete({
      where: {id}
    });
  }
}
