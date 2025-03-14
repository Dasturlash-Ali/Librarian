import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLangDto {
    @ApiProperty({ description: 'Til nomi', example: 'English' })
    @IsString()
    @IsNotEmpty()
    readonly lang_name: string
}