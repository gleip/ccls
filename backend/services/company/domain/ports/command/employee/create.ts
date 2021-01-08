import { IEmployee } from 'root/domain';

export type ICreateEmployee = Omit<
  IEmployee,
  'created' | 'updated' | 'deck' | 'account' | 'dust' | 'active' | 'id' | 'avatar'
>;
