import { IEmployee } from 'root/domain';

export type IGetEmployee = Pick<IEmployee, 'email'> & { password: string };
