import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AudioBookService } from './audio_book.service';
import { CreateAudioBookDto } from './dto/create-audio_book.dto';
import { UpdateAudioBookDto } from './dto/update-audio_book.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Audio Books')
@Controller('audio-book')
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @ApiOperation({ summary: 'Create a new audio book' })
  @ApiResponse({ status: 201, description: 'Audio book created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @ApiOperation({ summary: 'Get all audio books' })
  @ApiResponse({ status: 200, description: 'List of audio books.' })
  @Get()
  findAll() {
    return this.audioBookService.findAll();
  }

  @ApiOperation({ summary: 'Get a single audio book by ID' })
  @ApiResponse({ status: 200, description: 'Audio book found.' })
  @ApiResponse({ status: 404, description: 'Audio book not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioBookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an audio book' })
  @ApiResponse({ status: 200, description: 'Audio book updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioBookDto: UpdateAudioBookDto) {
    return this.audioBookService.update(+id, updateAudioBookDto);
  }

  @ApiOperation({ summary: 'Delete an audio book' })
  @ApiResponse({ status: 200, description: 'Audio book deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioBookService.remove(+id);
  }
}
