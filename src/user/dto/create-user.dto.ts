import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'Ali', description: 'Foydalanuvchining ismi' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: '+998901234567', description: 'Foydalanuvchining telefon raqami' })
    @IsString()
    @IsNotEmpty()
    readonly phone_number: string;

    @ApiProperty({ example: 'ali@example.com', description: 'Foydalanuvchining elektron pochtasi' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '12345678', description: 'Foydalanuvchining paroli' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ example: '12345678', description: 'Parolni tasdiqlash' })
    @IsString()
    @IsNotEmpty()
    readonly confirm_password: string;

    @ApiProperty({ example: 'Toshkent, Chilonzor', description: 'Foydalanuvchining yashash manzili' })
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({ example: 'erkak', description: 'Foydalanuvchining jinsi' })
    @IsString()
    @IsNotEmpty()
    readonly gender: string;

    @ApiProperty({ example: 50000, description: 'Foydalanuvchining balans miqdori' })
    @IsNumber()
    @IsOptional()
    readonly balance: number = 50000;

    activation_link: string;
}
