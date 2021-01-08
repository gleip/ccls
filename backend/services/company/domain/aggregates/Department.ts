import { IDepartment } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { Employee } from './Employee';
import { Wallet } from './Wallet';

export class Department implements BaseEntity<IDepartment> {
  private id: string;
  private name: string;
  private dust: Wallet;
  private employess: Employee[];
  constructor({ dust, employess, id, name }: IDepartment) {
    this.id = id;
    this.dust = new Wallet(dust);
    this.name = name;
    this.employess = employess.map(employee => new Employee(employee));
  }
  public serialize() {
    const employess = this.employess.map(employee => employee.serialize());
    return {
      id: this.id,
      name: this.name,
      dust: this.dust.serialize(),
      employess,
    };
  }
}
