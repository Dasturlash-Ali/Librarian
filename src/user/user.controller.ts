import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard, SuperAdminGuard, UserGuard, UserSelfGuard } from '../common/guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar royxati.' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi.' })
  @UseGuards(UserGuard, UserSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: "Foydalanuvchini o'chirish (faqat superadmin)" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o'chirildi." })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

