import { Injectable } from '@nestjs/common';
import { CreateBookLibraryDto } from './dto/create-book_library.dto';
import { UpdateBookLibraryDto } from './dto/update-book_library.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookLibraryService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createBookLibraryDto: CreateBookLibraryDto) {
    return this.prismaClientService.bookLibrary.create({
      data: {
        ...createBookLibraryDto
      },
      include:{
        book: true,
        library: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.bookLibrary.findMany({
      include:{
        book: true,
        library: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.bookLibrary.findUnique({
      where: {id},
      include:{
        book: true,
        library: true,
      }
    });
  }

  update(id: number, updateBookLibraryDto: UpdateBookLibraryDto) {
    return this.prismaClientService.bookLibrary.update({
      where: {id},
      data: updateBookLibraryDto,
    });
  }

  remove(id: number) {
    return this.prismaClientService.bookLibrary.delete({
      where: {id}
    });
  }
}
