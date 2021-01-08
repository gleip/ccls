import { IAdministrator } from 'root/domain';

export type ISetAdministratorPassword = Pick<IAdministrator, 'email'> & { verificationCode: string; password: string };
