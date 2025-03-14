import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({
        example: 'John',
        description: 'Muallifning ismi',
    })
    @IsString()
    @IsNotEmpty()
    readonly first_name: string

    @ApiProperty({
        example: 'Doe',
        description: 'Muallifning familiyasi',
    })
    @IsString()
    @IsNotEmpty()
    readonly last_name: string

    @ApiProperty({
        example: 'JD',
        description: 'Muallifning taxallusi (ixtiyoriy)',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly nickname?: string

    @ApiProperty({
        example: '1990-01-01',
        description: 'Muallifning tugilgan kuni',
    })
    @IsString()
    @IsNotEmpty()
    readonly birth_day: string

    @ApiProperty({
        example: 'Yozuvchi va shoir',
        description: 'Muallifning qisqacha tarjimai holi (ixtiyoriy)',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly bio?: string

    @ApiProperty({
        example: 'male',
        description: 'Muallifning jinsi (male yoki female)',
    })
    @IsString()
    @IsNotEmpty()
    readonly gender: string

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'Muallifning rasmi (ixtiyoriy)',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly image?: string
}
