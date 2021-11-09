import { IRole, IUser, IWallet } from 'root/domain';

export type CreateUser = Pick<IUser, 'email' | 'name' | 'surname' | 'patronymic' | 'spaceId' | 'phone'> & {
  role: Omit<IRole, 'dust'> & { dust: Pick<IWallet, 'amount'> };
};
