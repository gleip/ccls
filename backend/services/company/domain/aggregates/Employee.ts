import { IEmployee, IEmployeeDepartment, UserRole } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { Wallet } from './Wallet';
import { Deck } from './Deck';
import * as uuid from 'uuid';

// commands
import { ICreateEmployee } from '../ports/command/employee/create';

export class Employee implements BaseEntity<IEmployee> {
  private id: string;
  private active: boolean;
  private name: string;
  private surname: string;
  private patronymic: string;
  private avatar: string;
  private email: string;
  private phone?: string;
  private created: Date;
  private updated: Date;
  private department: IEmployeeDepartment;
  private role: UserRole;
  private account: Wallet;
  private dust: Wallet;
  private deck: Deck;
  constructor({
    account,
    dust,
    deck,
    role,
    department,
    active,
    avatar,
    created,
    email,
    id,
    name,
    patronymic,
    surname,
    updated,
    phone,
  }: IEmployee) {
    this.id = id;
    this.active = active;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.avatar = avatar;
    this.email = email;
    this.created = created;
    this.updated = updated;
    this.phone = phone;
    this.role = role;
    this.department = department;
    this.dust = new Wallet(dust);
    this.account = new Wallet(account);
    this.deck = new Deck(deck);
  }
  static create({ department, email, name, patronymic, role, surname, phone }: ICreateEmployee) {
    const date = new Date();
    return new Employee({
      id: uuid.v4(),
      active: false,
      dust: { amount: 0, updated: date },
      account: { amount: 0, updated: date },
      deck: { amount: 0, cards: [] },
      avatar: '',
      department,
      email,
      name,
      surname,
      patronymic,
      phone,
      role,
      created: date,
      updated: date,
    });
  }
  public serialize() {
    return {
      id: this.id,
      active: this.active,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      avatar: this.avatar,
      email: this.email,
      created: this.created,
      updated: this.updated,
      phone: this.phone,
      role: this.role,
      department: this.department,
      dust: this.dust.serialize(),
      account: this.account.serialize(),
      deck: this.deck.serialize(),
    };
  }
}
