import { IEmployee } from 'root/domain';

export type IUpdatedParam = Partial<
  Pick<IEmployee, 'avatar' | 'name' | 'surname' | 'patronymic' | 'email' | 'phone' | 'department' | 'role'>
>;
export type IUpdateEmployee = Pick<IEmployee, 'id'> & IUpdatedParam;
