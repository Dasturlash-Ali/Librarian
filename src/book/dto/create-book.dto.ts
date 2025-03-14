import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({
        example: "The Great Gatsby",
        description: "Kitob nomi",
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({
        example: "2023-01-01",
        description: "Nashr yili",
    })
    @IsString()
    @IsNotEmpty()
    readonly year: string

    @ApiProperty({
        example: 1,
        description: "Muallif ID raqami",
    })
    @IsInt()
    @IsNotEmpty()
    readonly author_id: number

    @ApiProperty({
        example: 2,
        description: "Nashriyot ID raqami",
    })
    @IsInt()
    @IsNotEmpty()
    readonly publisher_id: number

    @ApiProperty({
        example: "Kitob tavsifi",
        description: "Kitobning qisqacha mazmuni",
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly content?: string

    @ApiProperty({
        example: "19.99",
        description: "Kitob narxi",
    })
    @IsDecimal()
    @IsNotEmpty()
    readonly price: string

    @ApiProperty({
        example: 100,
        description: "Kitob soni",
    })
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number

    @ApiProperty({
        example: 3,
        description: "Til ID raqami",
    })
    @IsInt()
    @IsNotEmpty()
    readonly lang_id: number

    @ApiProperty({
        example: 4,
        description: "Kutubxona ID raqami",
        required: false,
    })
    @IsInt()
    @IsOptional()
    readonly library_id?: number

    @ApiProperty({
        example: "https://example.com/image.jpg",
        description: "Kitobning rasmi",
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly image?: string

    @ApiProperty({ example: 15000, description: 'Balansdan yechiladigan summa' })
    @IsInt()
    amount: number;
}
