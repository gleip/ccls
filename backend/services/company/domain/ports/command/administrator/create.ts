import { IAdministrator } from 'root/domain';

export type ICreateAdministrator = Pick<IAdministrator, 'email' | 'name' | 'surname' | 'patronymic' | 'phone'>;
