import { Injectable } from '@nestjs/common';
import { CreateAuthorLangDto } from './dto/create-author_lang.dto';
import { UpdateAuthorLangDto } from './dto/update-author_lang.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorLangsService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createAuthorLangDto: CreateAuthorLangDto) {
    return this.prismaClientService.authorLangs.create({
      data: createAuthorLangDto,
      include: {
        author: true,
        langs: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.authorLangs.findMany({
      include: {
        author: true,
        langs: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.authorLangs.findUnique({
      where: {id},
      include: {
        author: true,
        langs: true,
      }
    });
  }

  update(id: number, updateAuthorLangDto: UpdateAuthorLangDto) {
    return this.prismaClientService.authorLangs.update({
      where: {id},
      data: updateAuthorLangDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.authorLangs.delete({
      where: {id}
    });
  }
}