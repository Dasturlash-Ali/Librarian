import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: "Dasturlash", description: "Kategoriya nomi" })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 1, description: "Ota kategoriya ID (majburiy emas)", required: false })
    @IsInt()
    @IsOptional()
    readonly parent_id?: number;
}
