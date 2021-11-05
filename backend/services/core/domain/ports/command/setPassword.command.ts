import { IUser } from 'root/domain';

export type ISetPassword = Pick<IUser, 'email'> & { verificationCode: string; password: string };
