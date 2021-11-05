import { Role } from '../../../aggregates/Role';

export interface IChangeDustInRole {
  role: Role;
  dust: number;
}
