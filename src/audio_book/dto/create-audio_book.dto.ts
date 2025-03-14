import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAudioBookDto {
    @ApiProperty({
        example: 1,
        description: 'Kitobning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly book_id: number;

    @ApiProperty({
        example: 'https://example.com/audiofile.mp3',
        description: 'Audiokitobga tegishli fayl yoki link',
    })
    @IsString()
    @IsNotEmpty()
    readonly audioItem: string; // audiokitobga tegishli fayl yoki linkni saqlash uchun

    @ApiProperty({
        example: 1,
        description: 'Tilning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly lang_id: number;

    @ApiProperty({
        example: 2,
        description: 'Audio muallifning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly audioAuthor_id: number;

    @ApiProperty({ example: 15000, description: 'Balansdan yechiladigan summa' })
    @IsInt()
    amount: number;
}
