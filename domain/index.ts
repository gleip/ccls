export const enum RoleType {
  Administrator = 'administrator',
  Employee = 'employee',
  Manager = 'manager',
}

export const enum RarityType {
  Common = 'common',
  Rare = 'rare',
  Legendary = 'legendary',
}

export interface IRole {
  id: string;
  name: string;
  type: RoleType;
  dust: IWallet;
  manager: boolean;
  administrator: boolean;
}

export interface IWallet {
  amount: number;
  updated: Date;
}

export interface ISpace {
  id: string;
  name: string;
  dust: IWallet;
  active: boolean;
}

export interface ICard {
  id?: string;
  image: string;
  rarity: RarityType;
  power: number;
  assignedBy: string;
  assignedDate: Date;
  created: Date;
}

export interface IDeck {
  power: number;
  count: number;
  cards: ICard[];
}

export interface IUser {
  id: string;
  active: boolean;
  name: string;
  role: IRole;
  surname: string;
  patronymic: string;
  confirmed: boolean;
  avatar?: string;
  email: string;
  phone?: string;
  spaceId: string;
  coins: IWallet;
  deck: IDeck;
  created: Date;
  updated: Date;
}

export interface IAuth {
  token: string;
  refreshToken: string;
  expired: Date;
}

export interface IGenerateAuthResult {
  refresh: string;
  auth: IAuth;
}
