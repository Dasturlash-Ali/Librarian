import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDiscountDto {
    @ApiProperty({
        example: 1,
        description: 'Kitobning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly book_id: number

    @ApiProperty({
        example: 2,
        description: 'Chegirmaning ID raqami',
    })
    @IsInt()
    @IsNotEmpty()
    readonly discount_id: number
}
