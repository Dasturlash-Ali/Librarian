import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { AdminGuard, SuperAdminGuard, UserGuard, UserSelfGuard } from '../common/guards';

@ApiTags('Yetkazib berish')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: "Yangi yetkazib berishni qoshish" })
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: "Barcha yetkazib berishlarni korish" })
  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @UseGuards(UserGuard, UserSelfGuard || AdminGuard)
  @ApiOperation({ summary: "Bitta yetkazib berishni korish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard || AdminGuard)
  @ApiOperation({ summary: "Yetkazib berishni tahrirlash" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: "Yetkazib berishni ochirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
