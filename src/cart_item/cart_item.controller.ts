import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartItemService } from './cart_item.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@ApiTags('Savatcha elementlari')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @ApiOperation({ summary: 'Yangi savatcha elementini yaratish' })
  @ApiResponse({ status: 201, description: 'Yangi element muvaffaqiyatli yaratildi' })
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @ApiOperation({ summary: 'Barcha savatcha elementlarini olish' })
  @ApiResponse({ status: 200, description: 'Elementlar royxati' })
  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @ApiOperation({ summary: 'Bitta savatcha elementini olish' })
  @ApiResponse({ status: 200, description: 'Topilgan element' })
  @ApiResponse({ status: 404, description: 'Element topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @ApiOperation({ summary: 'Savatcha elementini yangilash' })
  @ApiResponse({ status: 200, description: 'Element muvaffaqiyatli yangilandi' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(+id, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Savatcha elementini ochirish' })
  @ApiResponse({ status: 200, description: 'Element muvaffaqiyatli ochirildi' })
  @ApiResponse({ status: 404, description: 'Element topilmadi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
