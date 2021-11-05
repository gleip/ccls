import { IEmployee } from 'root/domain';

export type IUpdatedParam = Partial<
  Pick<IEmployee, 'avatar' | 'name' | 'surname' | 'patronymic' | 'phone' | 'spaceId' | 'role'>
>;
export type IUpdateEmployee = Pick<IEmployee, 'id'> & IUpdatedParam;
