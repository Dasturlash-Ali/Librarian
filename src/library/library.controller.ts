import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @ApiOperation({ summary: 'Yangi kutubxona yaratish (admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Kutubxona yaratildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @ApiOperation({ summary: 'Barcha kutubxonalarni olish' })
  @ApiResponse({ status: 200, description: 'Kutubxonalar royxati.' })
  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @ApiOperation({ summary: 'Bitta kutubxonani olish' })
  @ApiResponse({ status: 200, description: 'Kutubxona topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Kutubxonani yangilash (admin)' })
  @ApiResponse({ status: 200, description: 'Kutubxona yangilandi.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @ApiOperation({ summary: 'Kutubxonani ochirish (admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Kutubxona ochirildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
