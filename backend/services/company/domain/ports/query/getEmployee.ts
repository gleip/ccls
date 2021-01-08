import { IEmployee } from 'root/domain';

export type IGetEmployee = Partial<Pick<IEmployee, 'id' | 'name' | 'surname' | 'patronymic' | 'email'>>;
