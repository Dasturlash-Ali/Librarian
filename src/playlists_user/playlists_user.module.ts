import { Module } from '@nestjs/common';
import { PlaylistsUserService } from './playlists_user.service';
import { PlaylistsUserController } from './playlists_user.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlaylistsUserController],
  providers: [PlaylistsUserService],
})
export class PlaylistsUserModule {}
