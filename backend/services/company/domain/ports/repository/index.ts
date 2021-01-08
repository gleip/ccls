import { Administrator } from '../../../domain/aggregates/Administrator';
import { Employee, Department, LegendaryCard } from '../../aggregates';

export interface ICompanyRepository {
  saveEmployee(employee: Employee, password?: string): Promise<void>;
  deleteEmployee(employeeId: string): Promise<void>;
  getEmployeeById(employeeId: string): Promise<Employee>;
  getEmployeeByEmail(email: string): Promise<Employee>;
  getEmployeeByRefreshToken(refreshToken: string): Promise<Employee>;
  getEmployeeHashPassword(email: string): Promise<string>;
  getEmployeeList(departmentId?: string): Promise<Employee[]>;
  saveRefreshToken(employeeId: string, refreshToken: string): Promise<void>;
  saveDepartment(department: Department): Promise<void>;
  getDepartment(params: { id?: string; name?: string }): Promise<Department[]>;
  saveLegendaryCard(card: LegendaryCard): Promise<void>;
  deleteLegendaryCard(cardId: string): Promise<void>;
  getLegendaryCardList(): Promise<LegendaryCard[]>;
}

export interface IAdministratorRepository {
  save(administrator: Administrator): Promise<void>;
  update(administrator: Administrator): Promise<void>;
  delete(administratorId: string): Promise<void>;
  getHashPassword(administratorId: string): Promise<string | null>;
  getById(id: string): Promise<Administrator | null>;
  getByEmail(email: string): Promise<Administrator | null>;
  getByRefreshToken(refreshToken: string): Promise<Administrator | null>;
  getByVerificationCode(email: string, verificationCode: string): Promise<Administrator | null>;
  getList(): Promise<Administrator[]>;
  saveHashPassword(administratorId: string, password: string): Promise<void>;
  saveVerificationCode(email: string, verificationCode: string | null): Promise<void>;
  saveRefreshToken(administratorId: string, refreshToken: string): Promise<void>;
}
