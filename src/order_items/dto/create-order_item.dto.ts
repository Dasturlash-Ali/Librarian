import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty({ example: 1, description: 'Cart item ID' })
    @IsInt()
    @IsNotEmpty()
    readonly cart_item_id: number;

    @ApiProperty({ example: 'pending', description: 'Order status' })
    @IsString()
    @IsNotEmpty()
    readonly order_status: string;

    @ApiProperty({ example: 2, description: 'Delivery ID' })
    @IsInt()
    @IsNotEmpty()
    readonly delivery_id: number;

    @ApiProperty({ example: 3, description: 'Discount ID', required: false })
    @IsInt()
    @IsOptional()
    readonly discount_id?: number;
}
