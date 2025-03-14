import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateCartDto {
    @ApiProperty({
        example: 1,
        description: "Foydalanuvchining ID raqami",
    })
    @IsInt()
    @IsNotEmpty()
    readonly user_id: number;

    @ApiProperty({
        example: "2025-03-13T14:30:00.000Z",
        description: "Savatcha yaratilgan sana va vaqt",
    })
    @IsDate()
    @IsNotEmpty()
    readonly createdAt: Date;
}
