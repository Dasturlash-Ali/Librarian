import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { MailerModule } from '../mailer/mailer.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({global: true}),
    UserModule,
    AdminModule,
    PrismaModule,
    MailerModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
