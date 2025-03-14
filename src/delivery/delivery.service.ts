import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaClientService: PrismaService) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return await this.prismaClientService.delivery.create({
      data: {
        ...createDeliveryDto,
        status: createDeliveryDto.status  || DeliveryStatus.NOT_AVAILABLE,
        delivery_type: createDeliveryDto.delivery_type || ''
      },
      include: {
        payment: true,
      },
    });
  }

  async findAll() {
    return await this.prismaClientService.delivery.findMany({
      include: {
        payment: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaClientService.delivery.findUnique({
      where: { id },
      include: {
        payment: true,
      },
    });
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return await this.prismaClientService.delivery.update({
      where: { id },
      data: {
        ...updateDeliveryDto,
        status: updateDeliveryDto.status || DeliveryStatus.NOT_AVAILABLE
      },
    });
  }

  async remove(id: number) {
    return await this.prismaClientService.delivery.delete({
      where: { id },
    });
  }
}
