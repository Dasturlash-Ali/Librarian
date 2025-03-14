import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCategoryAuthorDto {
    @ApiProperty({
        description: "Muallifning ID raqami",
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    readonly author_id: number;

    @ApiProperty({
        description: "Kategoriyaning ID raqami",
        example: 2
    })
    @IsInt()
    @IsNotEmpty()
    readonly category_id: number;
}
