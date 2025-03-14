import { Injectable } from '@nestjs/common';
import { CreatePlaylistsUserDto } from './dto/create-playlists_user.dto';
import { UpdatePlaylistsUserDto } from './dto/update-playlists_user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistsUserService {
  constructor( private readonly prismaClientService: PrismaService ) {}

  create(createPlaylistsUserDto: CreatePlaylistsUserDto) {
    return this.prismaClientService.playlistsUser.create({
      data: {...createPlaylistsUserDto},
      include: {
        audioBook: true,
        user: true,
      }
    });
  }

  findAll() {
    return this.prismaClientService.playlistsUser.findMany({
      include: {
        audioBook: true,
        user: true,
      }
    });
  }

  findOne(id: number) {
    return this.prismaClientService.playlistsUser.findUnique({
      where: {id},
      include: {
        audioBook: true,
        user: true,
      }
    });
  }

  update(id: number, updatePlaylistsUserDto: UpdatePlaylistsUserDto) {
    return this.prismaClientService.playlistsUser.update({
      where: {id},
      data: updatePlaylistsUserDto
    });
  }

  remove(id: number) {
    return this.prismaClientService.playlistsUser.delete({
      where: {id}
    });
  }
}
