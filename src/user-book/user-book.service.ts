import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Injectable()
export class UserBookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserBookDto: CreateUserBookDto) {
    const { userId, bookId, amount } = createUserBookDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const userBalance = parseFloat(user.balance || '0');
    if (userBalance < amount) throw new BadRequestException('Yetarli mablag‘ mavjud emas');

    // Balansdan yechish
    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: (userBalance - amount).toString() },
    });

    // UserBook yaratish
    return this.prisma.userBooks.create({
      data: {
        userId,
        bookId,
      },
    });
  }

  findAll() {
    return this.prisma.userBooks.findMany();
  }

  async findOne(id: number) {
    const userBook = await this.prisma.userBooks.findUnique({ where: { id } });
    if (!userBook) throw new NotFoundException('Foydalanuvchi kitobi topilmadi');
    return userBook;
  }

  async update(id: number, updateUserBookDto: UpdateUserBookDto) {
    await this.findOne(id); // mavjudligini tekshiramiz
    return this.prisma.userBooks.update({
      where: { id },
      data: updateUserBookDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.userBooks.delete({ where: { id } });
  }
}
