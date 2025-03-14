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

  @ApiOperation({ summary: 'Yangi buyurtma yaratish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Buyurtma yaratildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha buyurtmalar ro‘yxati.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Bitta buyurtmani olish (foydalanuvchi yoki admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi.' })
  @UseGuards(OrderOwnerGuard, AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Buyurtmani yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma yangilandi.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Buyurtmani o‘chirish' })
  @ApiResponse({ status: 200, description: 'Buyurtma o‘chirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}