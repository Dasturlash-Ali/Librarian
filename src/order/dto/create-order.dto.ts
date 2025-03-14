import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: 1, description: 'Savatcha IDsi' })
    @IsInt()
    @IsNotEmpty()
    readonly cart_id: number;

    @ApiProperty({ example: 2, description: 'Buyurtma elementlari IDsi' })
    @IsInt()
    @IsNotEmpty()
    readonly order_items_id: number;

    @ApiProperty({ example: '2023-03-13T12:00:00Z', description: 'Buyurtma yaratilgan vaqt' })
    @IsDate()
    @IsNotEmpty()
    readonly createdAt: Date;
}