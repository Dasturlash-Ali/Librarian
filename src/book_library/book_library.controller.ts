import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookLibraryService } from './book_library.service';
import { CreateBookLibraryDto } from './dto/create-book_library.dto';
import { UpdateBookLibraryDto } from './dto/update-book_library.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Book Library')
@Controller('book-library')
export class BookLibraryController {
  constructor(private readonly bookLibraryService: BookLibraryService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitob va kutubxona boglash' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createBookLibraryDto: CreateBookLibraryDto) {
    return this.bookLibraryService.create(createBookLibraryDto);
  }

  @ApiOperation({ summary: 'Barcha kitob-kutubxona bogliqliklarini olish' })
  @Get()
  findAll() {
    return this.bookLibraryService.findAll();
  }

  @ApiOperation({ summary: 'Kitob-kutubxona bogliqligini ID boyicha olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookLibraryService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitob-kutubxona bogliqligini yangilash' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookLibraryDto: UpdateBookLibraryDto) {
    return this.bookLibraryService.update(+id, updateBookLibraryDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kitob-kutubxona bogliqligini ochirish' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookLibraryService.remove(+id);
  }
}
