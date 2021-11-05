import { IUser } from 'root/domain';

export type ISignIn = Pick<IUser, 'email'> & { password: string };
