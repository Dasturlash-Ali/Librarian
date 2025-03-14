import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        example: "John Doe",
        description: "Adminning to'liq ismi"
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Adminning telefon raqami"
    })
    @IsString()
    @IsNotEmpty()
    readonly phone_number: string;

    @ApiProperty({
        example: "Toshkent shahri, Chilonzor tumani",
        description: "Adminning manzili"
    })
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({
        example: "admin@example.com",
        description: "Adminning email manzili"
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @ApiProperty({
        example: "password123",
        description: "Admin uchun parol"
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        example: "password123",
        description: "Parolni tasdiqlash"
    })
    @IsString()
    @IsNotEmpty()
    readonly confirm_password: string;
}
