import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublisherService {
  constructor( private readonly prismaClientService: PrismaService) {}

  create(createPublisherDto: CreatePublisherDto) {
    return this.prismaClientService.publisher.create({
      data: {
        name: createPublisherDto.name,
        address: createPublisherDto.address,
        phone_number: createPublisherDto.phone,
        email: createPublisherDto.email,
        website: createPublisherDto.website,
        founded_year: createPublisherDto.founded_year,
        country: createPublisherDto.country,
        active_status: createPublisherDto.active_status,
        logo: createPublisherDto.logo,
        brends: createPublisherDto.brends,
        image: createPublisherDto.image
      }
    });
  }

  findAll() {
    return this.prismaClientService.publisher.findMany();
  }

  findOne(id: number) {
    return this.prismaClientService.publisher.findUnique({
      where: {id}
    });
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    return this.prismaClientService.publisher.update({
      where: {id},
      data: updatePublisherDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.publisher.delete({
      where: {id}
    });
  }
}
