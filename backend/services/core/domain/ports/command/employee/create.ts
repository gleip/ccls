import { IUser } from 'root/domain';

export type ICreateEmployee = Pick<
  IUser,
  'id' | 'email' | 'name' | 'surname' | 'patronymic' | 'spaceId' | 'role' | 'phone'
>;
