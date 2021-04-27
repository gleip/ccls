import { IEmployee } from 'root/domain';

export type IGetEmployeeList = Partial<Pick<IEmployee, 'spaceId'>>;
