import 'reflect-metadata';
import { AuthService } from './AuthService';

const auth = new AuthService();

describe('Хеширование пароля', () => {
  const testPassword = 'testPassword';
  test('Пользовательский пароль успешно хешируется', async () => {
    const result = await auth.hashPassword(testPassword);
    console.log('----->', result);
  })
})
