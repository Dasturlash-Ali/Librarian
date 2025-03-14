import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UserSignInDto } from "../user/dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { AdminSignInDto, CreateAdminDto } from "../admin/dto";
import { MailerService } from "../mailer/mailer.service";
import { ResponseFields } from "../common/types/response.type";

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private readonly adminService: AdminService,
      private readonly jwtService: JwtService,
      private readonly mailService: MailerService,
      private readonly prismaService: PrismaService
  ) {}
  async signUp(createUserDto: CreateUserDto) {
      const condiate = await this.userService.findOneByEmail(
          createUserDto.email
      );
      if (condiate) {
          throw new BadRequestException("Such a user exists");
      }
      const newUser = await this.userService.create(createUserDto);
      try {
          const activationLink = `http://example.com/activate?link=${newUser.activation_link}`;
          await this.mailService.sendMail(newUser.email, activationLink);
      } catch (error) {
          console.log(error);
          throw new InternalServerErrorException("Error sending message");
      }
      const response = {
          message:
              "Congratulations, you have joined the system. We have sent an activation message to your email.",
          userId: newUser.id,
      };

      return response;
  }

  async signIn(
      userSignInDto: UserSignInDto,
      res: Response
  ): Promise<ResponseFields> {
      const { email, password } = userSignInDto;

      if (!email || !password) {
          throw new BadRequestException();
      }

      const user = await this.userService.findOneByEmail(email);

      if (!user) {
          throw new UnauthorizedException("Invalid Email or password");
      }
      const validPassword = await bcrypt.compare(
          userSignInDto.password,
          user.password
      );
      if (!validPassword) {
          throw new UnauthorizedException("Invalid Email or password");
      }
      if (!user.is_active) {
          throw new UnauthorizedException("user is not activate");
      }
      const tokens = this.userService.getTokens(user);

      const hashed_refresh_token = await bcrypt.hash((await tokens).refresh_token, 7);

      const updateUser = await this.userService.updateRefreshToken(
          user.id,
          hashed_refresh_token
      );
      if (!updateUser) {
          throw new InternalServerErrorException("Error saving token");
      }
      res.cookie("refresh_token", (await tokens).refresh_token, {
          maxAge: Number(process.env.COOKIE_TIME),
          httpOnly: true,
      });
      const response = {
          id: user.id,
          access_token: (await tokens).access_token,
      };

      return response;
  }

  async signOut(refreshToken: string, res: Response) {
      const userData = await this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
          throw new ForbiddenException("User not verified");
      }
      const hashed_refresh_token = null;
      await this.userService.updateRefreshToken(
          userData.id,
          hashed_refresh_token
      );

      res.clearCookie("refresh_token");

      const response = {
          message: "User logged out successfully",
      };
      return response;
  }

  async refreshToken(
      userId: number,
      refreshToken: string,
      res: Response
  ): Promise<ResponseFields> {
      const decodedToken = await this.jwtService.decode(refreshToken);

      if (userId != decodedToken["id"]) {
          throw new BadRequestException("Not allowed");
      }
      console.log("Decoded userId: ", userId, typeof userId);
      
      const user = await this.userService.findOne(Number(userId));
      if (!user || !user.hashed_refresh_token) {
          throw new BadRequestException("user not found");
      }

      const tokenMatch = await bcrypt.compare(
          refreshToken,
          user.hashed_refresh_token
      );

      if (!tokenMatch) {
          throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.userService.getTokens(user);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      await this.userService.updateRefreshToken(
          user.id,
          hashed_refresh_token
      );

      res.cookie("refresh_token", tokens.refresh_token, {
          maxAge: +process.env.COOKIE_TIME!,
          httpOnly: true,
      });
      const response = {
          id: user.id,
          access_token: tokens.access_token,
      };
      return response;
  }

  //===============================| For Admin |==========================================//

  async adminSignUp(createAdminDto: CreateAdminDto) {
      const condiate = await this.adminService.findByEmail(
          createAdminDto.email
      );
      if (condiate) {
          throw new BadRequestException("Admin olready exists");
      }
      const newAdmin = await this.adminService.create(createAdminDto);

      try {
          this.mailService.sendAdminMail(newAdmin);
      } catch (error) {
          console.log(error);
          throw new InternalServerErrorException("Error sending message");
      }
      const response = {
          message:
              "Congratulations, you have joined the system. We have sent an activation message to your email.",
          adminId: newAdmin.id,
      };

      return response;
  }

  async adminSignIn(
      adminSignInDto: AdminSignInDto,
      res: Response
  ): Promise<ResponseFields> {
      const { email, password } = adminSignInDto;

      if (!email || !password) {
          throw new BadRequestException();
      }

      const admin = await this.adminService.findByEmail(email);

      if (!admin) {
          throw new UnauthorizedException("Invalid Email or password");
      }
      if (!admin.is_active) {
          throw new UnauthorizedException("admin is not activate");
      }
      const validPassword = await bcrypt.compare(
          adminSignInDto.password,
          admin.password
      );
      if (!validPassword) {
          throw new UnauthorizedException("Invalid Email or password");
      }

      const tokens = await this.adminService.getToken(admin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updateAdmin = await this.adminService.updateRefreshToken(
          admin.id,
          hashed_refresh_token
      );
      if (!updateAdmin) {
          throw new InternalServerErrorException("Tokenni saqlashda xatolik");
      }
      res.cookie("refresh_token", tokens.refresh_token, {
          maxAge: +process.env.COOKIE_TIME!,
          httpOnly: true,
      });
      const response = {
          id: admin.id,
          access_token: tokens.access_token,
      };

      return response;
  }

  async AdminSignOut(refreshToken: string, res: Response) {
      const adminData = await this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!adminData) {
          throw new ForbiddenException("Admin not verified");
      }
      const hashed_refresh_token = null;
      await this.adminService.updateRefreshToken(
          adminData.id,
          hashed_refresh_token
      );

      res.clearCookie("refresh_token");

      const response = {
          message: "Admin logged out successfully",
      };
      return response;
  }

  async AdminRefreshToken(
      id: number,
      refreshToken: string,
      res: Response
  ): Promise<ResponseFields> {
      const decodedToken = await this.jwtService.decode(refreshToken);        
      if (id != decodedToken["id"]) {
          throw new BadRequestException("Not allowed");
      }

      const admin = await this.adminService.findOne(+id);
      if (!admin || !admin.hashed_refresh_token) {
          throw new BadRequestException("Admin not found");
      }

      const tokenMatch = await bcrypt.compare(
          refreshToken,
          admin.hashed_refresh_token
      );

      if (!tokenMatch) {
          throw new ForbiddenException("Forbidden");
      }

      const tokens = await this.adminService.getToken(admin);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      await this.adminService.updateRefreshToken(
          admin.id,
          hashed_refresh_token
      );

      res.cookie("refresh_token", tokens.refresh_token, {
          maxAge: +process.env.COOKIE_TIME!,
          httpOnly: true,
      });
      const response = {
          id: admin.id,
          access_token: tokens.access_token,
      };
      return response;
  }

  async activate(id: number) {
    if (!id) {
        throw new BadRequestException("User ID not found");
    }
    const user = await this.prismaService.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new BadRequestException("User not found");
    }
    if (user.is_active) {
        throw new BadRequestException("User already activated");
    }
    const updateUser = await this.prismaService.user.update({
        where: { id },
        data: { is_active: true },
    });

    if (!updateUser) {
        throw new BadRequestException("Failed to activate user");
    }
    return {
        message: "User activated successfully",
        is_active: updateUser.is_active,
    };
}

async activateAdmin(id: number) {
    if (!id) {
        throw new BadRequestException("Admin ID not found");
    }
    const admin = await this.prismaService.admin.findUnique({
        where: { id },
    });
    if (!admin) {
        throw new BadRequestException("Admin not found");
    }
    if (admin.is_active) {
        throw new BadRequestException("Admin already activated");
    }
    const updateAdmin = await this.prismaService.admin.update({
        where: { id },
        data: { is_active: true },
    });

    if (!updateAdmin) {
        throw new BadRequestException("Failed to activate admin");
    }
    return {
        message: "Admin activated successfully",
        is_active: updateAdmin.is_active,
    };
}

}
