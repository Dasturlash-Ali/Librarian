import { PartialType } from '@nestjs/swagger';
import { CreateUserBookDto } from './create-user-book.dto';

export class UpdateUserBookDto extends PartialType(CreateUserBookDto) {}
