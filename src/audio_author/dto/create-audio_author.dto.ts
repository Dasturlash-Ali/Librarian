import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateAudioAuthorDto {
    @ApiProperty({
        example: "John Doe",
        description: "Muallifning to'liq ismi",
    })
    @IsString()
    @IsNotEmpty()
    readonly fullname: string;

    @ApiProperty({
        example: "johnd",
        description: "Muallifning taxallusi",
    })
    @IsString()
    @IsNotEmpty()
    readonly nickname?: string;

    @ApiProperty({
        example: "+998901234567",
        description: "Muallifning telefon raqami",
    })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone_number: string;

    @ApiProperty({
        example: "Toshkent, Chilonzor tuman",
        description: "Muallifning manzili",
    })
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({
        example: "male",
        description: "Muallifning jinsi",
    })
    @IsString()
    @IsNotEmpty()
    readonly gender: string;

    @ApiProperty({
        example: 1,
        description: "Tilning ID raqami",
    })
    @IsInt()
    @IsNotEmpty()
    readonly lang_id: number;

    @ApiProperty({
        example: "https://example.com/image.jpg",
        description: "Muallifning rasmi",
    })
    @IsString()
    @IsNotEmpty()
    readonly image: string;
}
