import { PartialType } from '@nestjs/swagger';
import { CreateAuthorLangDto } from './create-author_lang.dto';

export class UpdateAuthorLangDto extends PartialType(CreateAuthorLangDto) {}
