import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUserBookDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi IDsi' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 101, description: 'Kitob IDsi' })
  @IsInt()
  bookId: number;

  @ApiProperty({ example: 15000, description: 'Balansdan yechiladigan summa' })
  @IsInt()
  amount: number;
}
