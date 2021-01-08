import { IDepartment } from 'root/domain';

export type ICreateDepartment = Pick<IDepartment, 'name' | 'dust'>;
