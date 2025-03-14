import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AdminGuard, SuperAdminGuard, UserGuard, UserSelfGuard } from '../common/guards';

@ApiTags('Savatcha')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Yangi savatcha yaratish' })
  @ApiResponse({ status: 201, description: 'Savatcha yaratildi.' })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Barcha savatchalarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha savatchalar.' })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @ApiOperation({ summary: 'Bitta savatchani olish' })
  @ApiResponse({ status: 200, description: 'Bitta savatcha topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @ApiOperation({ summary: 'Savatchani yangilash' })
  @ApiResponse({ status: 200, description: 'Savatcha yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @ApiOperation({ summary: 'Savatchani ochirish' })
  @ApiResponse({ status: 200, description: 'Savatcha ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
