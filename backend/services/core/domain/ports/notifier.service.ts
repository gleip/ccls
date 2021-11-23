export interface IParamsSendEmail {
  email: string;
  code: string;
}

export interface NotifierService {
  sendVerificationCode(params: IParamsSendEmail): Promise<void>;
}
