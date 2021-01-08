import { IDepartment } from 'root/domain';

export type IGetDepartment = Partial<Pick<IDepartment, 'name' | 'id'>>;
