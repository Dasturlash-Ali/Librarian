import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookDiscountService } from './book_discount.service';
import { CreateBookDiscountDto } from './dto/create-book_discount.dto';
import { UpdateBookDiscountDto } from './dto/update-book_discount.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Book Discount')
@Controller('book-discount')
export class BookDiscountController {
  constructor(private readonly bookDiscountService: BookDiscountService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitobga chegirma qoshish' })
  @Post()
  create(@Body() createBookDiscountDto: CreateBookDiscountDto) {
    return this.bookDiscountService.create(createBookDiscountDto);
  }

  @ApiOperation({ summary: 'Barcha kitob chegirmalarini olish' })
  @Get()
  findAll() {
    return this.bookDiscountService.findAll();
  }

  @ApiOperation({ summary: 'Kitob chegirmasini ID boyicha olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookDiscountService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitob chegirmasini yangilash' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDiscountDto: UpdateBookDiscountDto) {
    return this.bookDiscountService.update(+id, updateBookDiscountDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitob chegirmasini ochirish' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookDiscountService.remove(+id);
  }
}
