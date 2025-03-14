import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { AdminGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @ApiOperation({ summary: 'Yangi nashriyot qoshish (faqat admin va superadmin)' })
  @ApiResponse({ status: 201, description: 'Nashriyot yaratildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @ApiOperation({ summary: 'Barcha nashriyotlarni olish' })
  @ApiResponse({ status: 200, description: 'Nashriyotlar royxati.' })
  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @ApiOperation({ summary: 'Bitta nashriyotni olish' })
  @ApiResponse({ status: 200, description: 'Nashriyot topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publisherService.findOne(+id);
  }

  @ApiOperation({ summary: 'Nashriyotni yangilash (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Nashriyot yangilandi.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
    return this.publisherService.update(+id, updatePublisherDto);
  }

  @ApiOperation({ summary: 'Nashriyotni ochirish (faqat admin va superadmin)' })
  @ApiResponse({ status: 200, description: 'Nashriyot ochirildi.' })
  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publisherService.remove(+id);
  }
}
