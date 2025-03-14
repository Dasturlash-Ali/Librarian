import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AdminGuard, OrderOwnerGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi buyurtma yaratish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Buyurtma yaratildi.' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha buyurtmalar ro‘yxati.' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(OrderOwnerGuard, AdminGuard)
  @ApiOperation({ summary: 'Bitta buyurtmani olish (foydalanuvchi yoki admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Buyurtmani yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Buyurtmani ochirish' })
  @ApiResponse({ status: 200, description: 'Buyurtma ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}