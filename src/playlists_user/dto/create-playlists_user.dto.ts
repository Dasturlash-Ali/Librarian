import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistsUserDto {
    @ApiProperty({ example: 1, description: 'Audio kitobning ID si' })
    @IsInt()
    @IsNotEmpty()
    readonly audio_book_id: number;

    @ApiProperty({ example: 1, description: 'Foydalanuvchining ID si' })
    @IsInt()
    @IsNotEmpty()
    readonly user_id: number;

    @ApiProperty({ example: '5:30', description: 'Kitobni belgilangan joyi' })
    @IsString()
    @IsNotEmpty()
    readonly bookmark: string;

    @ApiProperty({ example: '2025-03-13T06:45:10.538Z', description: 'Yaratilgan sana' })
    @IsDateString()
    @IsNotEmpty()
    readonly createdAt: Date;

    @ApiProperty({ example: true, description: 'Toliq tugatilgan yoki yoqligi' })
    @IsBoolean()
    @IsNotEmpty()
    readonly completed: boolean;
}