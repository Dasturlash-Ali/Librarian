import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "@prisma/client";

@Injectable()
export class AdminService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        const { password, confirm_password } = createAdminDto;
        if (password != confirm_password) {
            throw new BadRequestException("Parollar mos emas");
        }

        const hashed_password = await bcrypt.hash(password, 7);

        const newAdmin = await this.prismaService.admin.create({
            data: {
              name: createAdminDto.name,
              phone_number: createAdminDto.phone_number,
              address: createAdminDto.address,
              email: createAdminDto.email,
              password: hashed_password
            },
        });

        return newAdmin
    }

    findAll() {
        return this.prismaService.admin.findMany();
    }

    findOne(id: number) {
        return this.prismaService.admin.findUnique({ where: { id } });
    }
    findByEmail(email: string) {
        return this.prismaService.admin.findUnique({ where: { email } });
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return this.prismaService.admin.update({
            where: { id },
            data: updateAdminDto,
        });
    }

    remove(id: number) {
        return this.prismaService.admin.delete({ where: { id } });
    }
    async getToken(admin: Admin) {
        const payload = {
            id: admin.id,
            is_active: admin.is_active,
            is_creator: admin.is_creator,
            email: admin.email,
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
    async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
        const updatedAdmin = await this.prismaService.admin.update({
            where: { id },
            data: { hashed_refresh_token },
        });

        return updatedAdmin;
    }
}
