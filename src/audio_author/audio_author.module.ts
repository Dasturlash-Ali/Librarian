import { Module } from '@nestjs/common';
import { AudioAuthorService } from './audio_author.service';
import { AudioAuthorController } from './audio_author.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AudioAuthorController],
  providers: [AudioAuthorService],
})
export class AudioAuthorModule {}
