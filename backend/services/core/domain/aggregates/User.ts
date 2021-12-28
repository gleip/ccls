import { BaseEntity } from './BaseEntity';
import { IUser } from '../interfaces';
import { Wallet } from './Wallet';
import { Deck } from './Deck';
import { Role, CreateRoleParam } from './Role';
import { Card } from './Card';
import { randomUUID } from 'crypto';

// commands
import { Register } from '../ports/input/user';

export interface IPassword {
  hash: string;
  salt: string;
}

type CreateNewUser = Omit<Register, 'password'> & { role: CreateRoleParam };
type UserCreateParam = Omit<IUser, 'role'> & { role: CreateRoleParam };

export class User implements BaseEntity<IUser> {
  private _id: string;
  private active: boolean;
  private _name: string;
  private _surname: string;
  private _patronymic: string;
  private _avatar?: string;
  private _email: string;
  private _password: IPassword;
  private _phone?: string;
  private created: Date;
  private updated: Date;
  private _spaceId?: string;
  private _role: Role;
  private _coins: Wallet;
  private deck: Deck;
  constructor({
    coins,
    deck,
    role,
    spaceId,
    active,
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
  }: UserCreateParam & { password: IPassword }) {
    this._id = id;
    this.active = active;
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
    this._coins = new Wallet(coins);
    this.deck = new Deck(deck);
  }
  static create({ spaceId, email, name, patronymic, role, surname, phone }: CreateNewUser) {
    const date = new Date();
    return new User({
      id: randomUUID(),
      active: true,
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
    this._coins.decrease(this._coins.ammount);
    this.updated = new Date();
  }
  public activate() {
    this.active = true;
    this.updated = new Date();
  }
  public isActive() {
    return this.active;
  }
  public putCard(card: Card) {
    this.deck.add(card);
    this._coins.increase(card.power);
    this.updated = new Date();
  }
  public writeOffDust(amount: number) {
    this._role.decreaseDust(amount);
  }
  public addDust(amount: number) {
    this._role.increaseDust(amount);
  }
  public isAdministrator() {
    return this._role.isAdministrator();
  }
  public isManager() {
    return this._role.isManager();
  }
  public getView() {
    return {
      id: this._id,
      active: this.active,
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
      coins: this._coins.getView(),
      deck: this.deck.getView(),
    };
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
  get id() {
    return this._id;
  }
  get coins() {
    return this._coins.ammount;
  }
  get dust() {
    return this._role.getDust();
  }
  set dust(amount: number) {
    this._role.setDustToZero();
    this._role.increaseDust(amount);
    this.updated = new Date();
  }
  set password(password: IPassword) {
    this._password = password;
    this.updated = new Date();
  }
  set email(email: string) {
    this._email = email;
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
