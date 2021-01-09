import { IEmployee } from 'root/domain';

export type ICreateEmployee = Pick<
  IEmployee,
  'email' | 'name' | 'surname' | 'patronymic' | 'department' | 'role' | 'phone'
>;
