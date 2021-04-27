import { IEmployee } from 'root/domain';

export type ICreateEmployee = Pick<
  IEmployee,
  'id' | 'email' | 'name' | 'surname' | 'patronymic' | 'spaceId' | 'role' | 'phone'
>;
