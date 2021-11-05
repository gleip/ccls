import { IUser } from 'root/domain';
import { BaseEntity } from 'root/backend/common/BaseEntity';
import { Wallet } from './Wallet';
import { Deck } from './Deck';
import { Role } from './Role';

// commands
import { ICreateEmployee } from '../ports/command/employee/create';
import { Card } from './Card';

interface IPassword {
  hash: string;
  salt: string;
}

export class User implements BaseEntity<IUser> {
  private _id: string;
  private active: boolean;
  private confirmed: boolean;
  private _name: string;
  private _surname: string;
  private _patronymic: string;
  private _avatar?: string;
  private _email: string;
  private _password: IPassword;
  private _phone?: string;
  private created: Date;
  private updated: Date;
  private _spaceId: string;
  private _role: Role;
  private coins: Wallet;
  private deck: Deck;
  constructor({
    coins,
    deck,
    role,
    spaceId,
    active,
    confirmed,
    avatar,
    created,
    email,
    password,
    id,
    name,
    patronymic,
    surname,
    updated,
    phone,
  }: IUser & { password: IPassword }) {
    this._id = id;
    this.active = active;
    this.confirmed = confirmed;
    this._name = name;
    this._surname = surname;
    this._patronymic = patronymic;
    this._avatar = avatar;
    this._email = email;
    this._password = password;
    this.created = created;
    this.updated = updated;
    this._phone = phone;
    this._role = new Role(role);
    this._spaceId = spaceId;
    this.coins = new Wallet(coins);
    this.deck = new Deck(deck);
  }
  static create({ id, spaceId, email, name, patronymic, role, surname, phone }: ICreateEmployee) {
    const date = new Date();
    return new User({
      id,
      active: true,
      confirmed: false,
      coins: { amount: 0, updated: date },
      deck: { count: 0, power: 0, cards: [] },
      avatar: '',
      spaceId,
      email,
      password: { hash: '', salt: '' },
      name,
      surname,
      patronymic,
      phone,
      role,
      created: date,
      updated: date,
    });
  }
  public deactivate() {
    this.active = false;
    this.coins.decrease(this.coins.ammount);
    this.updated = new Date();
  }
  public activate() {
    this.active = true;
    this.updated = new Date();
  }
  public confirm() {
    if (this.confirmed) {
      return;
    }
    this.confirmed = true;
    this.updated = new Date();
  }
  public isActive() {
    return this.active;
  }
  public putCard(card: Card) {
    this.deck.add(card);
    this.updated = new Date();
  }
  public getView() {
    return {
      id: this._id,
      active: this.active,
      confirmed: this.confirmed,
      name: this._name,
      surname: this._surname,
      patronymic: this._patronymic,
      avatar: this._avatar,
      email: this._email,
      created: this.created,
      updated: this.updated,
      phone: this._phone,
      spaceId: this._spaceId,
      role: this._role.getView(),
      coins: this.coins.getView(),
      deck: this.deck.getView(),
    };
  }
  get email() {
    return this._email;
  }
  get password() {
    return this.password;
  }
  get id() {
    return this._id;
  }
  set password(password: IPassword) {
    this._password = password;
    this.updated = new Date();
  }
  set name(name: string) {
    this._name = name;
    this.updated = new Date();
  }
  set surname(surname: string) {
    this._surname = surname;
    this.updated = new Date();
  }
  set patronymic(patronymic: string) {
    this._patronymic = patronymic;
    this.updated = new Date();
  }
  set avatar(avatar: string) {
    this._avatar = avatar;
    this.updated = new Date();
  }
  set phone(phone: string) {
    this._phone = phone;
    this.updated = new Date();
  }
  set spaceId(spaceId: string) {
    this._spaceId = spaceId;
    this.updated = new Date();
  }
  set role(role: Role) {
    this._role = role;
    this.updated = new Date();
  }
}