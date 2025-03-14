import { Module } from '@nestjs/common';
import { CategoryAuthorService } from './category_author.service';
import { CategoryAuthorController } from './category_author.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryAuthorController],
  providers: [CategoryAuthorService],
})
export class CategoryAuthorModule {}
