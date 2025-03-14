import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';
import { OrderOrAdminGuard } from '../common/guards/order_or_admin.guard';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi buyurtma qoshish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Buyurtma yaratildi.' })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: 200, description: 'Buyurtmalar royxati.' })
  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @UseGuards(OrderOrAdminGuard, AdminGuard)
  @ApiOperation({ summary: 'Bitta buyurtmani olish (foydalanuvchi yoki admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Buyurtmani yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Buyurtmani ochirish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Buyurtma ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}