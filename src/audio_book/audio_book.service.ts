import { Injectable } from '@nestjs/common';
import { CreateAudioBookDto } from './dto/create-audio_book.dto';
import { UpdateAudioBookDto } from './dto/update-audio_book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AudioBookService {
  constructor(private readonly prismaClientService: PrismaService) {}
  create(createAudioBookDto: CreateAudioBookDto) {
    return this.prismaClientService.audioBook.create({
      data: {
        ...createAudioBookDto,
      },
      include: {
        book: true,
        lang: true,
        audioAuthor: true,
      },
    });
  }

  findAll() {
    return this.prismaClientService.audioBook.findMany({
      include: {
        book: true,
        lang: true,
        audioAuthor: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.audioBook.findUnique({
      where: {id},
      include: {
        book: true,
        lang: true,
        audioAuthor: true,
      }
    });
  }

  update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
    return this.prismaClientService.audioBook.update({
      where: {id},
      data: updateAudioBookDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.audioBook.delete({
      where: {id}
    });
  }
}
