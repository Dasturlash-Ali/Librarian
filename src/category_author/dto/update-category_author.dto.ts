import { PartialType } from '@nestjs/swagger';
import { CreateCategoryAuthorDto } from './create-category_author.dto';

export class UpdateCategoryAuthorDto extends PartialType(CreateCategoryAuthorDto) {}
