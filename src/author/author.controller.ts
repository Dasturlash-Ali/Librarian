import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi muallif yaratish' })
  @ApiResponse({ status: 201, description: 'Muallif yaratildi.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mualliflarni ko‘rish' })
  @ApiResponse({ status: 200, description: 'Mualliflar ro‘yxati.' })
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Muallifni ID bo‘yicha topish' })
  @ApiResponse({ status: 200, description: 'Muallif topildi.' })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Get('find-by-name')
  @ApiOperation({ summary: 'Ism yoki taxallus bo‘yicha muallifni topish' })
  @ApiResponse({ status: 200, description: 'Muallif topildi.' })
  findOneByName(
    @Query('nickname') nickname?: string,
    @Query('first_name') first_name?: string,
    @Query('last_name') last_name?: string,
  ) {
    return this.authorService.findOneByName({ nickname, first_name, last_name });
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Muallif ma’lumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Muallif yangilandi.' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Muallifni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Muallif o‘chirildi.' })
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
