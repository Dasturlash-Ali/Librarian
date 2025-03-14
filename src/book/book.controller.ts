import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Yangi kitob yaratish' })
  @ApiResponse({ status: 201, description: 'Kitob muvaffaqiyatli yaratildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Barcha kitoblarni olish' })
  @ApiResponse({ status: 200, description: 'Kitoblar royxati' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Kitob nomi orqali qidirish' })
  @ApiQuery({ name: 'name', required: true, description: 'Kitob nomi' })
  @ApiResponse({ status: 200, description: 'Topilgan kitob' })
  @Get('findbyname')
  findByName(@Query('name') name: string) {
    return this.bookService.findByName(name);
  }

  @ApiOperation({ summary: 'Bitta kitobni olish' })
  @ApiParam({ name: 'id', required: true, description: 'Kitob ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan kitob' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Kitobni yangilash' })
  @ApiParam({ name: 'id', required: true, description: 'Kitob ID raqami' })
  @ApiResponse({ status: 200, description: 'Kitob muvaffaqiyatli yangilandi' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Kitobni ochirish' })
  @ApiParam({ name: 'id', required: true, description: 'Kitob ID raqami' })
  @ApiResponse({ status: 200, description: 'Kitob muvaffaqiyatli ochirildi' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
