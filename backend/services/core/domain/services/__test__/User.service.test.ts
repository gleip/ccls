import { container, TYPES } from '../../../inversify.config';
import { Role } from '../../aggregates';
import { getRegisterUser, getRole, getUserFromCollection } from '../../aggregates/tests/fixtures';
import { UserService } from '../User.service';

describe('Сервис "Пользователи"', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const userRepository = {
    put: jest.fn(),
    getByEmail: jest.fn(),
    getByRefreshKey: jest.fn(),
    getByVerificationCode: jest.fn(),
    setUserRefreshKey: jest.fn(),
  };
  const authTookit = {
    getHash: jest.fn(),
    getAuthInfo: jest.fn(),
    compare: jest.fn(),
  };
  const roleRepository = {
    getRoleByType: jest.fn(),
  };

  container.rebind(TYPES.RoleRepository).toConstantValue(roleRepository);
  container.rebind(TYPES.AuthService).toConstantValue(authTookit);
  container.rebind(TYPES.UserRepository).toConstantValue(userRepository);

  const userService = container.get<UserService>(TYPES.UserService);

  describe('Регистрация и вход "пользователя"', () => {
    const auth = { toke: '1', refreshToken: '1', expired: new Date() };
    roleRepository.getRoleByType.mockResolvedValue(new Role(getRole()));
    authTookit.getHash.mockResolvedValue({ hash: '1', salt: '1' });
    authTookit.getAuthInfo.mockReturnValue({ refresh: '1', auth });
    userRepository.put.mockResolvedValue('Ok');
    userRepository.getByEmail.mockResolvedValue(null);
    userRepository.setUserRefreshKey.mockResolvedValue('Ok');

    test('"Пользователь" успешно регистрируется и получает авторизационную информацию', async () => {
      const result = await userService.register({ ...getRegisterUser(), password: 'qwerty' });
      expect(result).toMatchObject(auth);
    });
    test('Если пользователь пытается зарегестрироваться в системе с email, который уже зарегестрирован, вобрасывается ошибка', async () => {
      userRepository.getByEmail.mockResolvedValue(getUserFromCollection());
      expect(userService.register({ ...getRegisterUser(), password: 'qwerty' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно получает авторизационную информацию по email и паролю', async () => {
      userRepository.getByEmail.mockResolvedValue(getUserFromCollection());
      authTookit.compare.mockResolvedValue(true);
      const result = await userService.signIn({ email: 'test@test.ru', password: 'qwerty' });
      expect(result).toMatchObject(auth);
    });
    test('Если "Пользователь" пытается войти в систему с неизвестным email выбрасывается ошибка', async () => {
      userRepository.getByEmail.mockResolvedValue(null);
      expect(userService.signIn({ email: 'test@test.ru', password: 'qwerty' })).rejects.toThrowError();
    });
    test('Если "Пользователь" пытается войти в систему с неверным паролем выбрасывается ошибка', async () => {
      userRepository.getByEmail.mockResolvedValue(getUserFromCollection());
      authTookit.compare.mockResolvedValue(false);
      expect(userService.signIn({ email: 'test@test.ru', password: 'qwerty' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно переполучает авторизационный токен', async () => {
      userRepository.getByRefreshKey.mockResolvedValue(getUserFromCollection());
      const result = await userService.refreshToken({ refreshKey: '1' });
      expect(result).toMatchObject(auth);
    });
    test('Если "Пользователь" не найден по refresh ключу выбрасывается ошибка', async () => {
      userRepository.getByRefreshKey.mockResolvedValue(null);
      expect(userService.refreshToken({ refreshKey: '1' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно меняет пароль', async () => {
      const user = getUserFromCollection();
      const newPassword = 'newPassword';
      const newHashedPassword = { salt: 'newSalt', hash: 'newHash' };
      userRepository.getByVerificationCode.mockResolvedValue(user);
      authTookit.getHash.mockResolvedValue(newHashedPassword);
      await userService.changePassword({ id: '1', password: newPassword, verificationCode: '2233' });
      expect(authTookit.getHash.mock.calls[0][0]).toBe(newPassword);
      expect(user.password).toBe(newHashedPassword);
    });
    test('Если "Пользователь" указал неверный код подтверждения выбрасывается ошибка', async () => {
      userRepository.getByVerificationCode.mockResolvedValue(null);
      expect(
        userService.changePassword({ id: '1', password: 'qwerty', verificationCode: '2233' }),
      ).rejects.toThrowError();
    });
    test('"Пользователю" успешно меняют роль', async () => {
      const user = getUserFromCollection();
      const newPassword = 'newPassword';
      const newHashedPassword = { salt: 'newSalt', hash: 'newHash' };
      userRepository.getByVerificationCode.mockResolvedValue(user);
      authTookit.getHash.mockResolvedValue(newHashedPassword);
      await userService.changePassword({ id: '1', password: newPassword, verificationCode: '2233' });
      expect(authTookit.getHash.mock.calls[0][0]).toBe(newPassword);
      expect(user.password).toBe(newHashedPassword);
    });
    test('Если "Пользователь" указал неверный код подтверждения выбрасывается ошибка', async () => {
      userRepository.getByVerificationCode.mockResolvedValue(null);
      expect(
        userService.changePassword({ id: '1', password: 'qwerty', verificationCode: '2233' }),
      ).rejects.toThrowError();
    });
  });
});
