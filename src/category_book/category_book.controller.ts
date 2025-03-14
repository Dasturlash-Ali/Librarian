import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryBookService } from './category_book.service';
import { CreateCategoryBookDto } from './dto/create-category_book.dto';
import { UpdateCategoryBookDto } from './dto/update-category_book.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Kategoriya va kitob boglanishi')
@Controller('category-book')
export class CategoryBookController {
  constructor(private readonly categoryBookService: CategoryBookService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Kategoriya va kitob boglanishini yaratish' })
  @Post()
  create(@Body() createCategoryBookDto: CreateCategoryBookDto) {
    return this.categoryBookService.create(createCategoryBookDto);
  }

  @ApiOperation({ summary: 'Barcha kategoriya va kitob boglanishlarini olish' })
  @Get()
  findAll() {
    return this.categoryBookService.findAll();
  }

  @ApiOperation({ summary: 'Kategoriya va kitob boglanishini ID boyicha olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryBookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Kategoriya va kitob boglanishini yangilash' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryBookDto: UpdateCategoryBookDto) {
    return this.categoryBookService.update(+id, updateCategoryBookDto);
  }

  @ApiOperation({ summary: 'Kategoriya va kitob boglanishini ochirish' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryBookService.remove(+id);
  }
}
