import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserBookService } from './user-book.service';
import { UserService } from '../user/user.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';
import { AdminGuard, AdminSelfGuard, SuperAdminGuard, UserGuard, UserSelfGuard } from '../common/guards';

@ApiTags('User Books')
@Controller('user-book')
export class UserBookController {
  constructor(
    private readonly userBookService: UserBookService,
    private readonly userService: UserService
  ) {}

  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiOperation({ summary: 'Foydalanuvchiga kitob bog‘lash va balansdan yechish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi kitobi yaratildi' })
  @ApiResponse({ status: 400, description: 'Xato: foydalanuvchi topilmadi yoki balans yetarli emas' })
  @Post()
  async create(@Body() createUserBookDto: CreateUserBookDto) {
    const { userId, amount } = createUserBookDto;

    const user = await this.userService.findOne(userId);
    if (!user) throw new BadRequestException('Foydalanuvchi topilmadi');

    await this.userService.deductBalance(userId, amount);

    return this.userBookService.create(createUserBookDto);
  }

  @ApiOperation({ summary: 'Barcha foydalanuvchi kitoblarini olish' })
  @ApiResponse({ status: 200, description: 'Barcha foydalanuvchi kitoblari' })
  @Get()
  findAll() {
    return this.userBookService.findAll();
  }

  @ApiOperation({ summary: 'Foydalanuvchining kitobini ID bo‘yicha olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchining kitobi' })
  @ApiResponse({ status: 404, description: 'Kitob topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBookService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @ApiOperation({ summary: 'Foydalanuvchi kitobini yangilash' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi kitobi yangilandi' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBookDto: UpdateUserBookDto) {
    return this.userBookService.update(+id, updateUserBookDto);
  }

  @UseGuards(AdminGuard, AdminSelfGuard)
  @ApiOperation({ summary: 'Foydalanuvchi kitobini o‘chirish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi kitobi o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Kitob topilmadi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBookService.remove(+id);
  }
}
