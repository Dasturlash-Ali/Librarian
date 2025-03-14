import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { AdminGuard, AdminSelfGuard, SuperAdminGuard } from '../common/guards';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiResponse({ status: 201, description: 'Admin yaratildi.' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni korish' })
  @ApiResponse({ status: 200, description: 'Adminlar royxati.' })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminGuard, AdminSelfGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Admin malumotini olish' })
  @ApiResponse({ status: 200, description: 'Admin topildi.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminGuard, AdminSelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Admin malumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Admin yangilandi.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Adminni ochirish' })
  @ApiResponse({ status: 200, description: 'Admin ochirildi.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
