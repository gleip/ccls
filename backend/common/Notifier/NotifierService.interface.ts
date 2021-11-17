export interface IParamsSendEmail {
  email: string;
  code: string;
}

export interface INotifier {
  sendVerificationCode(params: IParamsSendEmail): Promise<void>;
}
