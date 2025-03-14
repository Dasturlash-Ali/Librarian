import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  userService: any;
  constructor( 
    private readonly prismaClientService: PrismaService
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.prismaClientService.book.create({
      data: {
        name: createBookDto.name,
        year: createBookDto.year,
        author_id: createBookDto.author_id,
        publisher_id: createBookDto.publisher_id,
        content: createBookDto.content || "",
        price: createBookDto.price,
        quantity: createBookDto.quantity,
        lang_id: createBookDto.lang_id,
        library_id: createBookDto.library_id || null,
        image: createBookDto.image || "",
        amount: createBookDto.amount,
      },
      include: {
        author: true,
        publisher: true,
        lang: true,
        bookLibrary: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.book.findMany({
      include: {
        author: true,
        publisher: true,
        lang: true,
        bookLibrary: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.book.findUnique({
      where: {id},
      include: {
        author: true,
        publisher: true,
        lang: true,
        bookLibrary: true,
      }
    });
  }

  async findByName(name: string) {
    return this.prismaClientService.book.findFirst({
      where: { name },
      include: {
        author: true,
        publisher: true,
        lang: true,
        bookLibrary: true,
      }
    });
  }

  async readBook(userId: number, bookId: number) {
    const book = await this.prismaClientService.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Kitob topilmadi');
  
    const alreadyRead = await this.prismaClientService.userBooks.findFirst({
      where: { userId, bookId },
    });
  
    if (alreadyRead) throw new BadRequestException('Bu kitob allaqachon o‘qilgan');
  
    await this.userService.deductBalance(userId, book.price);
  
    await this.prismaClientService.userBooks.create({
      data: { userId, bookId },
    });
  
    return { message: 'Kitob muvaffaqiyatli o‘qildi!' };
  }
  

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prismaClientService.book.update({
      where: {id},
      data: updateBookDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.book.delete({
      where: {id}
    });
  }
}
