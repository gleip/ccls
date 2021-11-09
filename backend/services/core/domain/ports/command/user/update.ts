import { IUser } from 'root/domain';

export type UpdatedParam = Partial<
  Pick<IUser, 'avatar' | 'name' | 'surname' | 'patronymic' | 'phone' | 'spaceId' | 'role'>
>;
export type UpdateUser = Pick<IUser, 'id'> & UpdatedParam;
