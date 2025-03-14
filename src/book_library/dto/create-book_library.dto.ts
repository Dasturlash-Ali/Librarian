import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookLibraryDto {
    @ApiProperty({
        example: 1,
        description: "Kitobning IDsi"
    })
    @IsInt()
    @IsNotEmpty()
    readonly book_id: number;

    @ApiProperty({
        example: 2,
        description: "Kutubxonaning IDsi"
    })
    @IsInt()
    @IsNotEmpty()
    readonly library_id: number;
}
