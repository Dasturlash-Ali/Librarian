import { Module } from '@nestjs/common';
import { AuthorLangsService } from './author_langs.service';
import { AuthorLangsController } from './author_langs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorLangsController],
  providers: [AuthorLangsService],
})
export class AuthorLangsModule {}
