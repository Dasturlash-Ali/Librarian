import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AudioAuthorService } from './audio_author.service';
import { CreateAudioAuthorDto } from './dto/create-audio_author.dto';
import { UpdateAudioAuthorDto } from './dto/update-audio_author.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Audio Author')
@Controller('audio-author')
export class AudioAuthorController {
  constructor(private readonly audioAuthorService: AudioAuthorService) {}

  @ApiOperation({ summary: 'Create a new audio author' })
  @ApiResponse({ status: 201, description: 'Audio author created successfully.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createAudioAuthorDto: CreateAudioAuthorDto) {
    return this.audioAuthorService.create(createAudioAuthorDto);
  }

  @ApiOperation({ summary: 'Get all audio authors' })
  @ApiResponse({ status: 200, description: 'List of audio authors.' })
  @Get()
  findAll() {
    return this.audioAuthorService.findAll();
  }

  @ApiOperation({ summary: 'Find an audio author by name' })
  @ApiResponse({ status: 200, description: 'Audio author found.' })
  @Get('find-by-name')
  findOneByName(
    @Query('nickname') nickname?: string,
    @Query('fullname') fullname?: string,
  ) {
    return this.audioAuthorService.findOneByName({ nickname, fullname });
  }

  @ApiOperation({ summary: 'Get a single audio author by ID' })
  @ApiResponse({ status: 200, description: 'Audio author details.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioAuthorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an audio author by ID' })
  @ApiResponse({ status: 200, description: 'Audio author updated successfully.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioAuthorDto: UpdateAudioAuthorDto) {
    return this.audioAuthorService.update(+id, updateAudioAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an audio author by ID' })
  @ApiResponse({ status: 200, description: 'Audio author deleted successfully.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioAuthorService.remove(+id);
  }
}
