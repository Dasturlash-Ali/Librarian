import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private readonly prismaClientService: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = await this.prismaClientService.author.create({
      data: {
        first_name: createAuthorDto.first_name,
        last_name: createAuthorDto.last_name,
        nickname: createAuthorDto.nickname,
        birth_day: createAuthorDto.birth_day,
        bio: createAuthorDto.bio || "",
        gender: createAuthorDto.gender,
        image: createAuthorDto.image || "",
      }
    });

    return author;
  }

  findAll() {
    return this.prismaClientService.author.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.author.findUnique({where: {id}});
  }

  async findOneByName(filters: { nickname?: string; first_name?: string; last_name?: string }) {
    const conditions = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => ({ [key]: value }));
  
    console.log('Conditions:', conditions); // Natijani ko'rish uchun
  
    return this.prismaClientService.author.findFirst({
      where: {
        OR: conditions
      }
    });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.prismaClientService.author.update({
      where: {id},
      data: updateAuthorDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.author.delete({
      where: {id}
    });
  }
}
