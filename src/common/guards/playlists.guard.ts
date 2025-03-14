import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlaylistGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const playlistId = request.params.id;

    if (!user || !playlistId) {
      return false;
    }

    const admin = await this.prisma.admin.findUnique({
      where: { id: user.id },
    });

    if (admin) {
      return true;
    }

    const playlist = await this.prisma.playlistsUser.findUnique({
      where: { id: Number(playlistId) },
      select: { user_id: true },
    });

    if (!playlist) {
      return false;
    }

    return playlist.user_id === user.id;
  }
}
