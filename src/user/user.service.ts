import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { Tokens } from '../common/types/tokens.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor (
    private readonly prismaClientService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  
  async getTokens(user: User): Promise<Tokens> {
    const payload = {
      id: user.id,
      email: user.email,
  };
  const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
  ]);

  return {
      access_token: accessToken,
      refresh_token: refreshToken,
  };
  }
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, balance } = createUserDto
    
    if(password !== confirm_password) {
      throw new BadRequestException("Parollar aynan emas")
    }

    const hashedPassword = await bcrypt.hash(password, 7)

    const userBalance = balance && !isNaN(Number(balance)) ? balance.toString() : '50000';

    const newUser = await this.prismaClientService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone_number: createUserDto.phone_number,
        password: hashedPassword,
        address: createUserDto.address,
        gender: createUserDto.gender,
        balance: userBalance
      }
    });

    return newUser;
  }

  findAll() {
    return this.prismaClientService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaClientService.user.findUnique({where: {id}})

    if(!user){
      throw new BadRequestException("Bunday id-li user topilmadi")
    }

    return user;
  }

  async findOneByEmail(email: string){
    const user = await this.prismaClientService.user.findUnique({where: {email}})
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id)
    return this.prismaClientService.user.update({
      where: {id},
      data: {
        ...updateUserDto,
        balance: updateUserDto.balance ? updateUserDto.balance.toString() : undefined
      }
    });
  }

  async deductBalance(userId: number, amount: number) {
    const user = await this.prismaClientService.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
  
    const userBalance = user.balance ? parseFloat(user.balance) : 0;
    if (userBalance < amount) throw new BadRequestException('Yetarli mablag mavjud emas');
  
    return this.prismaClientService.user.update({
      where: { id: userId },
      data: { balance: (userBalance - amount).toString() },
    });
  }
  

  async updateRefreshToken(id: number, hashedToken: string | null){
    const updatedUser = await this.prismaClientService.user.update({
      where: {id},
      data: { hashed_refresh_token: hashedToken}
    });

    return updatedUser;
  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaClientService.user.delete({where: {id}});
  }
}
