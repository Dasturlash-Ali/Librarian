import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){
    name?: string;
    phone_number?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    address?: string
    gender?: string
}