import { PartialType } from '@nestjs/swagger';
import { CreateAudioAuthorDto } from './create-audio_author.dto';

export class UpdateAudioAuthorDto extends PartialType(CreateAudioAuthorDto) {}
