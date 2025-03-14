import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthorLangsService } from './author_langs.service';
import { CreateAuthorLangDto } from './dto/create-author_lang.dto';
import { UpdateAuthorLangDto } from './dto/update-author_lang.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Author Languages')
@Controller('author-langs')
export class AuthorLangsController {
  constructor(private readonly authorLangsService: AuthorLangsService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Yangi muallif tili yaratish' })
  @ApiResponse({ status: 201, description: 'Muallif tili yaratildi' })
  @Post()
  create(@Body() createAuthorLangDto: CreateAuthorLangDto) {
    return this.authorLangsService.create(createAuthorLangDto);
  }

  @ApiOperation({ summary: 'Barcha muallif tillarini olish' })
  @ApiResponse({ status: 200, description: 'Muallif tillari royxati' })
  @Get()
  findAll() {
    return this.authorLangsService.findAll();
  }

  @ApiOperation({ summary: 'Muayyan muallif tilini olish' })
  @ApiResponse({ status: 200, description: 'Muallif tili topildi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorLangsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Muallif tilini yangilash' })
  @ApiResponse({ status: 200, description: 'Muallif tili yangilandi' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorLangDto: UpdateAuthorLangDto) {
    return this.authorLangsService.update(+id, updateAuthorLangDto);
  }

  @ApiOperation({ summary: 'Muallif tilini ochirish' })
  @ApiResponse({ status: 200, description: 'Muallif tili ochirildi' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorLangsService.remove(+id);
  }
}
