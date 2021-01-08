import { IAdministrator } from 'root/domain';

export type ISignInAdministrator = Pick<IAdministrator, 'email'> & { password: string };
