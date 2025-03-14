import { PartialType } from '@nestjs/swagger';
import { CreateBookDiscountDto } from './create-book_discount.dto';

export class UpdateBookDiscountDto extends PartialType(CreateBookDiscountDto) {}
