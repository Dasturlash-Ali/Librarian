import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi chegirma yaratish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Chegirma yaratildi.' })
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Barcha chegirmalarni olish' })
  @ApiResponse({ status: 200, description: 'Chegirmalar royxati.' })
  @Get()
  findAll() {
    return this.discountsService.findAll();
  }

  @ApiOperation({ summary: 'Bitta chegirmani olish' })
  @ApiResponse({ status: 200, description: 'Chegirma topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Chegirmani yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Chegirma yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Chegirmani ochirish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Chegirma ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountsService.remove(+id);
  }
}
