import { PartialType } from '@nestjs/swagger';
import { CreateBookLibraryDto } from './create-book_library.dto';

export class UpdateBookLibraryDto extends PartialType(CreateBookLibraryDto) {}
