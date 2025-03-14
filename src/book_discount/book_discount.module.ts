import { Module } from '@nestjs/common';
import { BookDiscountService } from './book_discount.service';
import { BookDiscountController } from './book_discount.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookDiscountController],
  providers: [BookDiscountService],
})
export class BookDiscountModule {}
