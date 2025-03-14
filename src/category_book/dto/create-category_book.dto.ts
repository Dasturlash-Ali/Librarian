import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCategoryBookDto {
    @ApiProperty({ description: "Kitobning ID raqami" })
    @IsInt()
    @IsNotEmpty()
    readonly book_id: number;

    @ApiProperty({ description: "Kategoriya (turkum) ID raqami" })
    @IsInt()
    @IsNotEmpty()
    readonly category_id: number;
}
