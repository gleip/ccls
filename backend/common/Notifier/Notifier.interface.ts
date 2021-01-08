export interface IParamsSendEmail {
  email: string;
  subject: string;
  text: string;
}

export interface INotifier {
  sendEmail(params: IParamsSendEmail): Promise<void>;
}
