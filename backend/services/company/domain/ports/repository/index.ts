import { Employee, Card } from '../../aggregates';

export interface IEmployeeRepository {
  getEmployeeHashPassword(employeeId: string): Promise<string | null>;
  putEmployeeHashPassword(employeeId: string, password: string): Promise<void>;
  putEmployeeVerificationCode(email: string, verificationCode: string | null): Promise<void>;
  putEmployeeRefreshToken(employeeId: string, refreshToken: string): Promise<void>;
  getIdForNewEmployee(): string;
  getById(employeeId: string): Promise<Employee | null>;
  getByEmail(email: string): Promise<Employee | null>;
  getByVerificationCode(verificationCode: string): Promise<Employee | null>;
  getByRefreshToken(token: string): Promise<Employee | null>;
  getList(spaceId?: string): Promise<NodeJS.ReadableStream>; // TODO: Типизировать поток
  put(employee: Employee): Promise<void>;
}

export interface ILegendaryCardRepository {
  get(id: string): Promise<Card | null>;
  put(card: Card): Promise<void>;
  remove(id: string): Promise<void>;
}
