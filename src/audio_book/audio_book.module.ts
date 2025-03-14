import { Module } from '@nestjs/common';
import { AudioBookService } from './audio_book.service';
import { AudioBookController } from './audio_book.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AudioBookController],
  providers: [AudioBookService],
})
export class AudioBookModule {}
