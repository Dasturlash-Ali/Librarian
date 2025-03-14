import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LangService } from './lang.service';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Languages')
@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi til qoshish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Til yaratildi.' })
  @Post()
  create(@Body() createLangDto: CreateLangDto) {
    return this.langService.create(createLangDto);
  }

  @ApiOperation({ summary: 'Barcha tillarni olish' })
  @ApiResponse({ status: 200, description: 'Tillar royxati.' })
  @Get()
  findAll() {
    return this.langService.findAll();
  }

  @ApiOperation({ summary: 'Bitta tilni olish' })
  @ApiResponse({ status: 200, description: 'Til topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.langService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Tilni yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Til yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLangDto: UpdateLangDto) {
    return this.langService.update(+id, updateLangDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Tilni ochirish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Til ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langService.remove(+id);
  }
}
