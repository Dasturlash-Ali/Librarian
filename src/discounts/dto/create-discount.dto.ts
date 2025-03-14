import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscountDto {
    @ApiProperty({ description: 'Chegirma miqdori', example: 20 })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'Chegirma yaratilgan sana', example: '2025-03-13T14:00:00.000Z' })
    @IsString()
    @IsNotEmpty()
    createdAt: string;

    @ApiProperty({ description: 'Chegirma tugash vaqti', example: '2025-04-13T14:00:00.000Z' })
    @IsString()
    @IsNotEmpty()
    finishedAt: string;

    @ApiProperty({ description: 'Chegirma sababi', example: 'Bahorgi aksiya' })
    @IsString()
    @IsNotEmpty()
    reason: string;
}
