import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailerService {
  sendAdminMail(newAdmin: { id: number; name: string; phone_number: string; email: string; password: string; hashed_refresh_token: string | null; address: string; is_active: boolean; is_creator: boolean; }) {
    throw new Error("Method not implemented.");
  }
  private transporter: nodemailer.Transporter<SentMessageInfo>;
  private readonly logger = new Logger(MailerService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(toEmail: string, link: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: 'Librarian account-ini faollashtirish',
        html: `
          <div>
            <h2>Accaountni faollashtirish uchun linkni bosing:</h2>
            <a href="${link}">Faollashtirish</a>
          </div>
        `,
      });

      this.logger.log(`Email yuborildi: ${toEmail}`);
    } catch (error) {
      this.logger.error('Email yuborishda xatolik', error);
      throw error;
    }
  }
}
