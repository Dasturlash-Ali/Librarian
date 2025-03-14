import { Module } from '@nestjs/common';
import { CategoryBookService } from './category_book.service';
import { CategoryBookController } from './category_book.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryBookController],
  providers: [CategoryBookService],
})
export class CategoryBookModule {}
