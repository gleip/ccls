import { IDepartment } from 'root/domain';

export type IUpdateDepartment = Pick<IDepartment, 'id' | 'name'>;
