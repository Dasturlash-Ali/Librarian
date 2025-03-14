import { Injectable } from '@nestjs/common';
import { CreateAudioAuthorDto } from './dto/create-audio_author.dto';
import { UpdateAudioAuthorDto } from './dto/update-audio_author.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AudioAuthorService {
  constructor(private readonly prismaClientService: PrismaService) {}
  create(createAudioAuthorDto: CreateAudioAuthorDto) {
    return this.prismaClientService.audioAuthor.create({
      data: {
        ...createAudioAuthorDto
      },
      include: {
        authorLangs: true
      }
    });
  }

  findAll() {
    return this.prismaClientService.audioAuthor.findMany({
      include: {
        authorLangs: true
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.audioAuthor.findUnique({
      where: {id},
      include: {
        authorLangs: true
      }
    });
  }

  async findOneByName(filters: { nickname?: string; fullname?: string }) {
    const conditions = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => ({ [key]: value }));
  
    console.log('Conditions:', conditions); // Natijani ko'rish uchun
  
    return this.prismaClientService.audioAuthor.findFirst({
      where: {
        OR: conditions
      },
      include: {
        authorLangs: true
      }
    });
  }

  update(id: number, updateAudioAuthorDto: UpdateAudioAuthorDto) {
    return this.prismaClientService.audioAuthor.update({where: {id}, data:updateAudioAuthorDto});
  }

  remove(id: number) {
    return this.prismaClientService.audioAuthor.delete({where: {id}});
  }
}
