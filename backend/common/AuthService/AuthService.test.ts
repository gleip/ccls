import 'reflect-metadata';
import { AuthService } from './AuthService';

describe('Генерация хешей и объектов авторизации', () => {
  const testPassword = 'testPassword';
  process.env.JWT_TOKEN_SECRET = 'secret';
  process.env.JWT_TOKEN_TTL_IN_SECOND = '300';
  process.env.REFRESH_TOKEN_TTL_IN_SECOND = '3000';
  const auth = new AuthService();
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
  test('Успешно генерируется объек для авторизации пользователя', async () => {
    const authUserInfo = auth.getAuth({
      id: '1',
      confirmed: true,
      email: 'test@test.ru',
      role: {  }
    })
  })
});
