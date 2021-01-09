import { IEmployee } from 'root/domain';

export type IGetEmployeeList = Partial<Pick<IEmployee, 'id' | 'name' | 'surname' | 'patronymic' | 'email'>> & {
  departmentId?: string;
};
