import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlaylistsUserService } from './playlists_user.service';
import { CreatePlaylistsUserDto } from './dto/create-playlists_user.dto';
import { UpdatePlaylistsUserDto } from './dto/update-playlists_user.dto';
import { AdminGuard, PlaylistGuard } from '../common/guards';

@ApiTags('PlaylistsUser')
@Controller('playlists-user')
export class PlaylistsUserController {
  constructor(private readonly playlistsUserService: PlaylistsUserService) {}

  @ApiOperation({ summary: 'Foydalanuvchining audio kitoblarini yaratish' })
  @ApiResponse({ status: 201, description: 'Audio kitob yaratildi.' })
  @Post()
  create(@Body() createPlaylistsUserDto: CreatePlaylistsUserDto) {
    return this.playlistsUserService.create(createPlaylistsUserDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Barcha foydalanuvchilar uchun audio kitoblarni olish (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Barcha audio kitoblar royxati.' })
  @Get()
  findAll() {
    return this.playlistsUserService.findAll();
  }

  @UseGuards(PlaylistGuard)
  @ApiOperation({ summary: 'Bitta foydalanuvchining audio kitobini olish' })
  @ApiResponse({ status: 200, description: 'Audio kitob topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsUserService.findOne(+id);
  }

  @UseGuards(PlaylistGuard)
  @ApiOperation({ summary: 'Foydalanuvchining audio kitobini yangilash' })
  @ApiResponse({ status: 200, description: 'Audio kitob yangilandi.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistsUserDto: UpdatePlaylistsUserDto) {
    return this.playlistsUserService.update(+id, updatePlaylistsUserDto);
  }

  @UseGuards(PlaylistGuard)
  @ApiOperation({ summary: 'Foydalanuvchining audio kitobini ochirish' })
  @ApiResponse({ status: 200, description: 'Audio kitob ochirildi.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsUserService.remove(+id);
  }
}