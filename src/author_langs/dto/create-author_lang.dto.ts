import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateAuthorLangDto {
    @ApiProperty({
        example: 1,
        description: 'Tilning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly lang_id: number

    @ApiProperty({
        example: 2,
        description: 'Audio muallifning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly audioAuthor_id: number
}
