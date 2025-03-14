import { PartialType } from '@nestjs/swagger';
import { CreateCategoryBookDto } from './create-category_book.dto';

export class UpdateCategoryBookDto extends PartialType(CreateCategoryBookDto) {}
