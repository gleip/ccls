import { User } from '../../User';
import { RoleType } from 'root/domain';
import { Card } from '../../Card';
import { Role } from '../..';
import { getRegisterUser, getCard, getViewUser, getUserFromCollection } from '../fixtures';

describe('Методы работы с "Пользователем"', () => {
  const card = new Card(getCard());
  test('Успешно создается новый пользователь', () => {
    const newUser = User.create(getRegisterUser());
    expect(newUser.getView()).toMatchObject(getRegisterUser());
  });
  test('Пользователь успешно восстанавливается', () => {
    const userParam = getUserFromCollection();
    const userView = getViewUser();
    const existUser = new User(userParam);
    expect(existUser.getView()).toMatchObject(userView);
  });
  test('Пользователя можно деактивировать', () => {
    const user = new User(getUserFromCollection());
    user.deactivate();
    expect(user.isActive()).toBeFalsy();
  });
  test('При деактивации баланс "монет" пользователя сбрасывается до 0', () => {
    const user = new User(getUserFromCollection());
    user.deactivate();
    expect(user.coins).toBe(0);
  });
  test('Деактивированного пользователя можно активировать', () => {
    const user = new User(getUserFromCollection());
    user.deactivate();
    user.activate();
    expect(user.isActive()).toBeTruthy();
  });
  test('Пользователю можно подарить "Карточку"', () => {
    const newUser = User.create(getRegisterUser());
    newUser.putCard(card);
    expect(newUser.getView().deck.cards[0]).toMatchObject(card.getView());
  });
  test('Когда пользователю дарят карточку его баланс возрастает на номинал карточки', () => {
    const newUser = User.create(getRegisterUser());
    newUser.putCard(card);
    expect(newUser.coins).toBe(card.power);
  });
  test('У пользователя можно списать определенное количество пыли', () => {
    const newUser = User.create(getRegisterUser());
    newUser.writeOffDust(100);
    expect(newUser.dust).toBe(900);
  });
  test('Пользователю можно начислить определенное количество пыли', () => {
    const newUser = User.create(getRegisterUser());
    newUser.addDust(100);
    expect(newUser.dust).toBe(1100);
  });
  test('Пользователю можно установить определенное количество пыли', () => {
    const newUser = User.create(getRegisterUser());
    newUser.dust = 2000;
    expect(newUser.dust).toBe(2000);
  });
  test('У пользователя можно узнать является ли он администратором', () => {
    const newUser = User.create(getRegisterUser());
    expect(newUser.isAdministrator()).toBeFalsy();
  });
  test('У пользователя можно узнать является ли он менеджером', () => {
    const newUser = User.create(getRegisterUser());
    expect(newUser.isManager()).toBeFalsy();
  });
  test('У пользователя можно узнать его id', () => {
    const newUser = User.create(getRegisterUser());
    expect(newUser.id).not.toBeUndefined();
  });
  test('У пользователя можно получить email', () => {
    const newUser = User.create(getRegisterUser());
    expect(newUser.email).toBe('test@test.ru');
  });
  test('У пользователя можно получить объект пароля', () => {
    const user = new User(getUserFromCollection());
    expect(user.password).toMatchObject({ hash: '1', salt: '1' });
  });
  test('Пользователю можно поменять имя', () => {
    const user = new User(getUserFromCollection());
    const newName = 'Петр';
    user.name = newName;
    expect(user.getView().name).toBe(newName);
  });
  test('Пользователю можно поменять фамилию', () => {
    const user = new User(getUserFromCollection());
    const newSurname = 'Петров';
    user.surname = newSurname;
    expect(user.getView().surname).toBe(newSurname);
  });
  test('Пользователю можно поменять отчество', () => {
    const user = new User(getUserFromCollection());
    const newPatronymic = 'Петрович';
    user.patronymic = newPatronymic;
    expect(user.getView().patronymic).toBe(newPatronymic);
  });
  test('Пользователю можно поменять аватар', () => {
    const user = new User(getUserFromCollection());
    const newAvatar = 'imageLink';
    user.avatar = newAvatar;
    expect(user.getView().avatar).toBe(newAvatar);
  });
  test('Пользователю можно поменять телефон', () => {
    const user = new User(getUserFromCollection());
    const newPhone = '+79888888888';
    user.phone = newPhone;
    expect(user.getView().phone).toBe(newPhone);
  });
  test('Пользователя можно перевести в другое "пространство"', () => {
    const user = new User(getUserFromCollection());
    const newSpaceId = 'newUuid';
    user.spaceId = newSpaceId;
    expect(user.getView().spaceId).toBe(newSpaceId);
  });
  test('Пользователя можно поменять роль', () => {
    const user = new User(getUserFromCollection());
    const newRole = new Role({
      id: '2',
      name: 'Менеджер',
      type: RoleType.Manager,
      dust: { amount: 3000 },
    });
    user.role = newRole;
    expect(user.isManager).toBeTruthy();
  });
  test('Пользователю можно поменять пароль', () => {
    const user = new User(getUserFromCollection());
    const newPassword = { hash: '2', salt: '2' };
    user.password = newPassword;
    expect(user.password).toMatchObject(newPassword);
  });
  test('Пользователю можно поменять email', () => {
    const user = new User(getUserFromCollection());
    const newEmail = 'test2@test.ru';
    user.email = newEmail;
    expect(user.email).toBe(newEmail);
  });
});
