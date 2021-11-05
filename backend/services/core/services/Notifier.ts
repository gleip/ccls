import { INotifier, IParamsSendEmail } from 'root/backend/common/Notifier/Notifier.interface';
import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { errorHandling } from '../../../common/decorators';
import { injectable } from 'inversify';

@injectable()
export class Notifier implements INotifier {
  private MailService: Mail;
  constructor() {
    if (
      !process.env.SMTP_SERVER_URL ||
      !process.env.SMTP_SERVER_USERNAME ||
      !process.env.SMTP_SERVER_PASSWORD ||
      !process.env.SMTP_SERVER_PORT
    ) {
      throw new Error('Не заданы настройки для рассылки уведомлений');
    }

    this.MailService = nodemailer.createTransport({
      host: process.env.SMTP_SERVER_URL,
      port: +process.env.SMTP_SERVER_PORT,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });
  }

  @errorHandling('Не удалось отправить сообщение клиенту')
  public async sendVerificationCode({ email, code }: IParamsSendEmail) {
    await this.MailService.sendMail({
      subject: 'Секретный код для смены пароля',
      to: email,
      from: process.env.SMTP_SERVER_USERNAME,
      text: `Что бы сменить пароль введите этот код: ${code}`,
    });
  }
}
