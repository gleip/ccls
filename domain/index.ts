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
  role: RoleType;
  flour: IWallet;
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
  flour: IWallet;
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

export interface IEmployeeDepartment {
  id: string;
  name: string;
}

export interface IEmployee {
  id: string;
  active: boolean;
  name: string;
  role: IRole;
  surname: string;
  patronymic: string;
  confirmed: boolean
  avatar?: string;
  email: string;
  phone?: string;
  spaceId: string;
  wallet: IWallet;
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
