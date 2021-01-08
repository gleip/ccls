import { IAdministrator } from 'root/domain';

export type IUpdatedParam = Partial<
  Pick<IAdministrator, 'avatar' | 'name' | 'surname' | 'patronymic' | 'email' | 'phone'>
>;
export type IUpdateAdministrator = Pick<IAdministrator, 'id'> & IUpdatedParam;
