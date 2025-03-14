import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryAuthorService } from './category_author.service';
import { CreateCategoryAuthorDto } from './dto/create-category_author.dto';
import { UpdateCategoryAuthorDto } from './dto/update-category_author.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Kategoriya va Muallif boglanishi')
@Controller('category-author')
export class CategoryAuthorController {
  constructor(private readonly categoryAuthorService: CategoryAuthorService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Kategoriya va muallifni boglash (faqat SuperAdmin)' })
  @ApiResponse({ status: 201, description: 'Kategoriya va muallif boglandi.' })
  @Post()
  create(@Body() createCategoryAuthorDto: CreateCategoryAuthorDto) {
    return this.categoryAuthorService.create(createCategoryAuthorDto);
  }

  @ApiOperation({ summary: 'Barcha boglangan kategoriya-mualliflarni olish' })
  @ApiResponse({ status: 200, description: 'Boglangan kategoriya-mualliflar royxati.' })
  @Get()
  findAll() {
    return this.categoryAuthorService.findAll();
  }

  @ApiOperation({ summary: 'ID boyicha boglangan kategoriya-muallifni olish' })
  @ApiResponse({ status: 200, description: 'Boglangan kategoriya-muallif topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryAuthorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Kategoriya-muallif boglanishini yangilash (faqat Admin)' })
  @ApiResponse({ status: 200, description: 'Kategoriya-muallif boglanishi yangilandi.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryAuthorDto: UpdateCategoryAuthorDto) {
    return this.categoryAuthorService.update(+id, updateCategoryAuthorDto);
  }

  @ApiOperation({ summary: 'Kategoriya-muallif boglanishini ochirish (faqat SuperAdmin)' })
  @ApiResponse({ status: 200, description: 'Kategoriya-muallif boglanishi ochirildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryAuthorService.remove(+id);
  }
}
