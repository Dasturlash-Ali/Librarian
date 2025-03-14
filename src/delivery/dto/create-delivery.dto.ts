import { ApiProperty } from "@nestjs/swagger";
import { DeliveryStatus } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeliveryDto {
    @ApiProperty({ description: "Yetkazib berish manzili" })
    @IsString()
    @IsNotEmpty()
    readonly adress: string;

    @ApiProperty({ description: "Yetkazib berish holati (status)" })
    @IsEnum(DeliveryStatus)
    readonly status: DeliveryStatus;

    @ApiProperty({ description: "Tolov ID raqami" })
    @IsInt()
    @IsNotEmpty()
    readonly payments_id: number;

    @ApiProperty({ description: "Yetkazib berish turi (Online yoki Offline)", required: false })
    @IsString()
    @IsOptional()
    readonly delivery_type?: string;
}
