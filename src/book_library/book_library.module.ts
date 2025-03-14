import { Module } from '@nestjs/common';
import { BookLibraryService } from './book_library.service';
import { BookLibraryController } from './book_library.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookLibraryController],
  providers: [BookLibraryService],
})
export class BookLibraryModule {}
