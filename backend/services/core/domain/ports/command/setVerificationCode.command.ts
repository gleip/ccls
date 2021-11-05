import { IUser } from 'root/domain';

export type ISetVrificationCode = Pick<IUser, 'email'>;
