import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistsUserDto } from './create-playlists_user.dto';

export class UpdatePlaylistsUserDto extends PartialType(CreatePlaylistsUserDto) {}
