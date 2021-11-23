import { RarityType, RoleType } from 'root/domain';

export const getRole = (type: RoleType = RoleType.Employee, amount: number = 1000) => ({
  id: '1',
  name: 'Сотрудник',
  dust: {
    amount,
  },
  type,
});

export const getRegisterUser = (type: RoleType = RoleType.Employee, amount?: number) => ({
  email: 'test@test.ru',
  spaceId: '1',
  name: 'Иван',
  surname: 'Иванов',
  patronymic: 'Иванович',
  role: getRole(type, amount),
});

export const getExistUser = () => ({ ...getRegisterUser() });

export const getViewUser = (type: RoleType = RoleType.Employee, amount?: number) => ({
  ...getRegisterUser(type, amount),
  id: '1',
  active: true,
  coins: { amount: 1000, updated: new Date() },
  created: new Date(),
  updated: new Date(),
  deck: { cards: [], count: 0, power: 0 },
});

export const getUserFromCollection = (type: RoleType = RoleType.Employee, amount?: number) => ({
  ...getViewUser(type, amount),
  password: { hash: '1', salt: '1' },
});

export const getCard = (power: number = 100, rarity: RarityType = RarityType.Common) => ({
  id: '1',
  created: new Date(),
  image: 'uuid',
  name: 'Тестовая карта',
  description: 'За хорошую работу',
  space: 'Разработка',
  power,
  rarity,
  assignedBy: 'uuid',
  assignedDate: new Date(),
});

export const getLegendaryCard = () => ({
  created: new Date(),
  image: 'uuid',
  name: 'Тестовая карта',
  description: 'За хорошую работу',
  power: 10000,
  rarity: RarityType.Legendary,
  id: 'uuid',
});

export const getSpace = (name: string = 'Разработка', amount: number = 1000) => ({
  id: '1',
  name,
  active: true,
  dust: { amount },
});
