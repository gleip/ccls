import { NotifierService, IParamsSendEmail } from '../../services/core/domain/ports/output/notifier.service';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { injectable } from 'inversify';
import { ConfigurableService } from '../ConfigurableService';

@injectable()
export class Notifier extends ConfigurableService implements NotifierService {
  private MailService: Mail;
  private smtpServerHost: string;
  private smtpServerUsername: string;
  private smtpServerPassword: string;
  private smtpServerPort: number;
  constructor() {
    super();
    this.smtpServerHost = this.getSettingFromEnv('SMTP_SERVER_HOST');
    this.smtpServerUsername = this.getSettingFromEnv('SMTP_SERVER_USERNAME');
    this.smtpServerPassword = this.getSettingFromEnv('SMTP_SERVER_PASSWORD');
    this.smtpServerPort = this.castToNumber(this.getSettingFromEnv('SMTP_SERVER_PORT'));

    this.MailService = nodemailer.createTransport({
      host: this.smtpServerHost,
      port: this.smtpServerPort,
      auth: {
        user: this.smtpServerUsername,
        pass: this.smtpServerPassword,
      },
    });
  }

  public async sendVerificationCode({ email, code }: IParamsSendEmail) {
    await this.MailService.sendMail({
      subject: 'Секретный код',
      to: email,
      from: process.env.SMTP_SERVER_USERNAME,
      text: `Что бы изменить настройки введите этот код: ${code}`,
    });
  }
}
