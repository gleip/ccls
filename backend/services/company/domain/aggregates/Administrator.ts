import { IAdministrator, UserRole } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import * as uuid from 'uuid';

// commands
import { ICreateAdministrator } from '../ports/command/administrator/create';
import { IUpdatedParam } from '../ports/command/administrator/update';

export class Administrator implements BaseEntity<IAdministrator> {
  private _id: string;
  private _email: string;
  private active: boolean;
  private name: string;
  private surname: string;
  private patronymic: string;
  private avatar: string;
  private phone?: string;
  private role: UserRole = UserRole.Administrator;
  private created: Date;
  private updated: Date;
  constructor({
    avatar,
    created,
    email,
    id,
    name,
    patronymic,
    surname,
    updated,
    phone,
    active,
  }: Omit<IAdministrator, 'role'>) {
    this._id = id;
    this._email = email;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.avatar = avatar;
    this.created = created;
    this.updated = updated;
    this.phone = phone;
    this.active = active;
  }
  static create({ email, name, patronymic, surname, phone }: ICreateAdministrator) {
    const date = new Date();
    return new Administrator({
      id: uuid.v4(),
      active: false,
      avatar: '',
      email,
      name,
      surname,
      patronymic,
      phone,
      created: date,
      updated: date,
    });
  }
  public update({ avatar, email, name, patronymic, phone, surname }: IUpdatedParam) {
    this.avatar = avatar ?? this.avatar;
    this._email = email ?? this.email;
    this.name = name ?? this.name;
    this.patronymic = patronymic ?? this.patronymic;
    this.phone = phone ?? this.phone;
    this.surname = surname ?? this.surname;
    this.updated = new Date();
  }
  public serialize() {
    return {
      id: this._id,
      active: this.active,
      role: this.role,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      avatar: this.avatar,
      email: this.email,
      created: this.created,
      updated: this.updated,
      phone: this.phone,
    };
  }
  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
}
