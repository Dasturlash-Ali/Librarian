import { ApiProperty } from "@nestjs/swagger";
import { PaymentsMethod, PaymentsStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({ example: 1, description: "Foydalanuvchi ID" })
    @IsInt()
    @IsNotEmpty()
    readonly user_id: number;

    @ApiProperty({ example: 2, description: "Savatdagi mahsulot ID" })
    @IsInt()
    @IsNotEmpty()
    readonly cart_item_id: number;

    @ApiProperty({ example: "CREDIT_CARD", description: "Tolov usuli" })
    @IsEnum(PaymentsMethod)
    @IsNotEmpty()
    readonly payment_method: PaymentsMethod;

    @ApiProperty({ example: "PENDING", description: "Tolov holati" })
    @IsEnum(PaymentsStatus)
    @IsNotEmpty()
    readonly status: PaymentsStatus;

    @ApiProperty({ example: "2025-03-13T06:45:10.538Z", description: "Yaratilgan sana" })
    @IsString()
    @IsNotEmpty()
    readonly createdAt: string;

    @ApiProperty({ example: 3, description: "Buyurtma ID" })
    @IsInt()
    @IsNotEmpty()
    readonly order_id: number;

    @ApiProperty({ example: 10000, description: "Tolov summasi" })
    @IsInt()
    @IsNotEmpty()
    readonly amount: number;

    @ApiProperty({ example: "CASH", description: "Naqd yoki karta" })
    @IsNotEmpty()
    readonly method: string;
}
