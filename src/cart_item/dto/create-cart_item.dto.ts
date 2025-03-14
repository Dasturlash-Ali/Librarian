import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartItemDto {
    @ApiProperty({ example: 1, description: 'Savatcha ID raqami' })
    @IsInt()
    @IsNotEmpty()
    readonly cart_id: number;

    @ApiProperty({ example: 101, description: 'Kitob ID raqami' })
    @IsInt()
    @IsNotEmpty()
    readonly book_id: number;

    @ApiProperty({ example: 3, description: 'Kitob miqdori' })
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: bigint;
}
