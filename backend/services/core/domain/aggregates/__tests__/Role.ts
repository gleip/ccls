import { RoleType } from 'root/domain';
import { Role } from '../Role';

describe('Методы работы с "Ролью"', () => {
  const createParam = {
    id: '1',
    name: 'Сотрудник',
    type: RoleType.Employee,
    dust: { amount: 1000 },
  };
  test('Роль успешно создается', () => {
    const role = new Role(createParam);
    expect(role.getView()).toMatchObject(createParam);
  });
  test('Роль сотрудника успешно создается', () => {
    const role = new Role(createParam);
    expect(role.isManager()).toBeFalsy();
    expect(role.isAdministrator()).toBeFalsy();
  });
  test('Роль менеджера успешно создается', () => {
    const role = new Role({ ...createParam, id: '2', name: 'Менеджер', type: RoleType.Manager });
    expect(role.isManager()).toBeTruthy();
  });
  test('Роль администратора успешно создается', () => {
    const role = new Role({ ...createParam, id: '2', name: 'Администратор', type: RoleType.Administrator });
    expect(role.isAdministrator()).toBeTruthy();
  });
});
