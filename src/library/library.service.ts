import { Injectable } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private readonly prismaClientService: PrismaService) {}

  create(createLibraryDto: CreateLibraryDto) {
    return this.prismaClientService.library.create({
      data: {
        ...createLibraryDto
      }
    });
  }

  findAll() {
    return this.prismaClientService.library.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.library.findUnique({
      where: {id}
    });
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return this.prismaClientService.library.update({
      where: {id},
      data: updateLibraryDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.library.delete({
      where: {id}
    });
  }
}
