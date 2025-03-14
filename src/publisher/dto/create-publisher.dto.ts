import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDate, IsUrl, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ example: 'BookHouse', description: 'Publisher nomi' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: '123 Main St', description: 'Publisher manzili' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: 'info@bookhouse.com', description: 'Email manzili' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'https://bookhouse.com', description: 'Vebsayt' })
  @IsNotEmpty()
  @IsUrl()
  readonly website: string;

  @ApiProperty({ example: '2023-01-01', description: 'Tashkil topgan yili' })
  @IsNotEmpty()
  @IsString()
  readonly founded_year: string;

  @ApiProperty({ example: 'Uzbekistan', description: 'Mamlakat' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @ApiProperty({ example: true, description: 'Faollik holati' })
  @IsNotEmpty()
  @IsBoolean()
  readonly active_status: boolean;

  @ApiProperty({ example: 'logo.png', description: 'Logo rasmi' })
  @IsNotEmpty()
  @IsString()
  readonly logo: string;

  @ApiProperty({ example: 'Brand A, Brand B', description: 'Brendlar' })
  @IsNotEmpty()
  @IsString()
  readonly brends: string;

  @ApiProperty({ example: 'image.png', description: 'Publisher rasmi' })
  @IsNotEmpty()
  @IsString()
  readonly image: string;
}