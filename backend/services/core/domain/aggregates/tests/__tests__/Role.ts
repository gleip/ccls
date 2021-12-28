import { RoleType } from '../../../interfaces';
import { Role } from '../../Role';
import { getRole } from '../fixtures';

describe('Методы работы с "Ролью"', () => {
  test('Роль успешно создается', () => {
    const role = new Role(getRole());
    expect(role.getView()).toMatchObject(getRole());
  });
  test('Роль сотрудника успешно создается', () => {
    const role = new Role(getRole());
    expect(role.isManager()).toBeFalsy();
    expect(role.isAdministrator()).toBeFalsy();
  });
  test('Роль менеджера успешно создается', () => {
    const role = new Role({ ...getRole(), id: '2', name: 'Менеджер', type: RoleType.Manager });
    expect(role.isManager()).toBeTruthy();
  });
  test('Роль администратора успешно создается', () => {
    const role = new Role({ ...getRole(), id: '2', name: 'Администратор', type: RoleType.Administrator });
    expect(role.isAdministrator()).toBeTruthy();
  });
});
