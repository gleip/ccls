import { RarityType, RoleType } from 'root/domain';

export const getRole = () => ({
  id: '1',
  name: 'Сотрудник',
  dust: {
    amount: 1000,
  },
  type: RoleType.Employee,
});

export const getRegisterUser = () => ({
  email: 'test@test.ru',
  spaceId: '1',
  name: 'Иван',
  surname: 'Иванов',
  patronymic: 'Иванович',
  role: getRole(),
});

export const getExistUser = () => ({ ...getRegisterUser() });

export const getViewUser = () => ({
  ...getRegisterUser(),
  id: '1',
  active: true,
  coins: { amount: 1000, updated: new Date() },
  created: new Date(),
  updated: new Date(),
  deck: { cards: [], count: 0, power: 0 },
});

export const getUserFromCollection = () => ({
  ...getViewUser(),
  password: { hash: '1', salt: '1' },
});

export const getCard = (power: number = 100) => ({
  id: '1',
  created: new Date(),
  image: 'uuid',
  name: 'Тестовая карта',
  description: 'За хорошую работу',
  space: 'Разработка',
  power,
  rarity: RarityType.Common,
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

export const getSpace = () => ({
  id: '1',
  name: 'Разработка',
  active: true,
  dust: { amount: 1000 },
});
