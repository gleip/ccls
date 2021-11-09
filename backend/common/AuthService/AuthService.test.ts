import 'reflect-metadata';
import { AuthService } from './AuthService';
import { User } from '../../services/core/domain/aggregates/User';
import { RoleType } from 'root/domain';
import * as jsonwebtoken from 'jsonwebtoken';

describe('Генерация хешей, объектов авторизации и кодов подтверждения', () => {
  const testPassword = 'testPassword';
  process.env.JWT_TOKEN_SECRET = 'secret';
  process.env.JWT_TOKEN_TTL_IN_SECOND = '300';
  process.env.REFRESH_TOKEN_TTL_IN_SECOND = '3000';
  const auth = new AuthService();

  describe('Хеширование паролей', () => {
    test('Пользовательский пароль успешно хешируется', async () => {
      const result = await auth.getHash(testPassword);
      expect(result.hash).not.toBeUndefined();
      expect(result.salt).not.toBeUndefined();
    });
    test('Правильный переданный пароль успешно сравнивается с хешем', async () => {
      const hashedInfo = await auth.getHash(testPassword);
      const result = await auth.compare(testPassword, hashedInfo);
      expect(result).toBeTruthy();
    });
  });

  describe('Получени объекта авторизации пользователя', () => {
    const authUserInfo = auth.getAuth(
      User.create({
        email: 'test@test.ru',
        name: 'Иван',
        patronymic: 'Иванович',
        surname: 'Иванов',
        phone: '+79999999999',
        spaceId: '1',
        role: {
          id: '1',
          name: 'Сотрудник',
          type: RoleType.Employee,
          dust: { amount: 1000 },
        },
      }),
    );
    test('Успешно генерируется ключ для переполучения токена авторизации', () => {
      expect(authUserInfo.refresh).not.toBeUndefined();
    });
    test('В токене зашифрованны необходимые данные для авторизации пользователя', () => {
      const data = jsonwebtoken.decode(authUserInfo.auth.token);
      expect(data).toMatchObject({
        role: {
          id: '1',
          type: 'employee',
          name: 'Сотрудник',
          dust: { amount: 1000 },
        },
        spaceId: '1',
        confirmed: false,
        email: 'test@test.ru',
      });
    });
    test('В refresh токене хранится ключ для перевыпуска токена авторизации пользователя', () => {
      const data = jsonwebtoken.decode(authUserInfo.auth.refreshToken);
      expect(data).toMatchObject({ refresh: authUserInfo.refresh });
    });
  });

  describe('Генерация кодов подтверждения', () => {
    test('Успешно генерируется шестизначный код подтверждения', () => {
      const code = auth.generateVerificationCode();
      expect(code.length).toBe(6);
    });
  });
});
