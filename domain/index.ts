export const enum UserRole {
  Administrator = 'administrator',
  Employee = 'employee',
  Manager = 'manager',
}

export const enum CardRarity {
  Common = 'common',
  Rare = 'rare',
  Legendary = 'legendary',
}

export interface IRole {
  role: UserRole;
  dust: IWallet;
}

export interface IUser {
  id: string;
  active: boolean;
  name: string;
  role: UserRole;
  surname: string;
  patronymic: string;
  avatar?: string;
  email: string;
  phone?: string;
  created: Date;
  updated: Date;
}

export type IAdministrator = IUser;

export interface IWallet {
  amount: number;
  updated: Date;
}

export interface IDepartment {
  id: string;
  name: string;
  dust: IWallet;
  employess: IEmployee[];
}

export interface ICard {
  id: string;
  image: string;
  rarity: CardRarity;
  amount: number;
}

export type IAssignedEmployee = Pick<IEmployee, 'avatar' | 'name' | 'surname' | 'patronymic' | 'id'>;

export interface IAssignedCard extends ICard {
  assignedBy: IAssignedEmployee[];
  assigned: Date;
  created?: Date;
}

export interface ILegendaryCard extends ICard {
  rarity: CardRarity.Legendary;
  created: Date;
}

export interface IDeck {
  amount: number;
  cards: IAssignedCard[];
}

export interface IEmployeeDepartment {
  id: string;
  name: string;
}

export interface IEmployee extends IUser {
  department: IEmployeeDepartment;
  account: IWallet;
  dust: IWallet;
  deck: IDeck;
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
