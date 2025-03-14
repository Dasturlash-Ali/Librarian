import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsEmail } from "class-validator";

export class AdminSignInDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
