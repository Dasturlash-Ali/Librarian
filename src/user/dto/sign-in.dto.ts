import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UserSignInDto {
    @ApiProperty({
        example: "user@example.com",
        description: "Foydalanuvchining email manzili",
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @ApiProperty({
        example: "123456",
        description: "Foydalanuvchining paroli",
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
  role: any;
}
