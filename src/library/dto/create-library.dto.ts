import { ApiProperty, ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLibraryDto {
    @ApiProperty({ description: 'Kutubxona nomi' })
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'Kutubxona manzili' })
    @IsString()
    @IsNotEmpty()
    readonly address: string

    @ApiProperty({ description: 'Kutubxona tavsifi' })
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'Kutubxona rasmi' })
    @IsString()
    @IsNotEmpty()
    readonly image: string
}