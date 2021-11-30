import { RarityType, RoleType } from 'root/domain';
import { container, TYPES } from '../../../inversify.config';
import { Card, Role, Space, User } from '../../aggregates';
import { getCard, getRegisterUser, getRole, getSpace, getUserFromCollection } from '../../aggregates/tests/fixtures';
import { UserService } from '../User.service';

describe('Сервис "Пользователи"', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const repository = {
    putUser: jest.fn(),
    getUserById: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserByRefreshKey: jest.fn(),
    getUserByVerificationCode: jest.fn(),
    setUserRefreshKey: jest.fn(),
    setUserVerificationCode: jest.fn(),
    getUserList: jest.fn(),
    getRoleByType: jest.fn(),
    getSpaceById: jest.fn(),
    savePutCardResult: jest.fn(),
    getLegendaryCardById: jest.fn(),
    removeLegendaryCardById: jest.fn(),
    addLegendaryCard: jest.fn(),
  };
  const authTookit = {
    getHash: jest.fn(),
    getAuthInfo: jest.fn(),
    compare: jest.fn(),
    generateVerificationCode: jest.fn(),
  };
  const notifier = {
    sendVerificationCode: jest.fn(),
  };
  const cardGenerator = {
    makeCard: jest.fn(),
  };

  container.rebind(TYPES.AuthService).toConstantValue(authTookit);
  container.rebind(TYPES.CardGenerator).toConstantValue(cardGenerator);
  container.rebind(TYPES.CoreRepository).toConstantValue(repository);
  container.rebind(TYPES.Notifier).toConstantValue(notifier);

  const userService = container.get<UserService>(TYPES.UserService);

  describe('Регистрация и вход "пользователя"', () => {
    const auth = { toke: '1', refreshToken: '1', expired: new Date() };
    repository.getRoleByType.mockResolvedValue(new Role(getRole()));
    authTookit.getHash.mockResolvedValue({ hash: '1', salt: '1' });
    authTookit.getAuthInfo.mockReturnValue({ refresh: '1', auth });
    repository.putUser.mockResolvedValue('Ok');
    repository.getUserByEmail.mockResolvedValue(null);
    repository.setUserRefreshKey.mockResolvedValue('Ok');

    test('"Пользователь" успешно регистрируется и получает авторизационную информацию', async () => {
      const result = await userService.register({ ...getRegisterUser(), password: 'qwerty' });
      expect(result).toMatchObject(auth);
    });
    test('Если пользователь пытается зарегестрироваться в системе с email, который уже зарегестрирован, вобрасывается ошибка', async () => {
      repository.getUserByEmail.mockResolvedValue(new User(getUserFromCollection()));
      expect(userService.register({ ...getRegisterUser(), password: 'qwerty' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно получает авторизационную информацию по email и паролю', async () => {
      repository.getUserByEmail.mockResolvedValue(new User(getUserFromCollection()));
      authTookit.compare.mockResolvedValue(true);
      const result = await userService.signIn({ email: 'test@test.ru', password: 'qwerty' });
      expect(result).toMatchObject(auth);
    });
    test('Если "Пользователь" пытается войти в систему с неизвестным email выбрасывается ошибка', async () => {
      repository.getUserByEmail.mockResolvedValue(null);
      expect(userService.signIn({ email: 'test@test.ru', password: 'qwerty' })).rejects.toThrowError();
    });
    test('Если "Пользователь" пытается войти в систему с неверным паролем выбрасывается ошибка', async () => {
      repository.getUserByEmail.mockResolvedValue(new User(getUserFromCollection()));
      authTookit.compare.mockResolvedValue(false);
      expect(userService.signIn({ email: 'test@test.ru', password: 'qwerty' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно переполучает авторизационный токен', async () => {
      repository.getUserByRefreshKey.mockResolvedValue(new User(getUserFromCollection()));
      const result = await userService.refreshToken({ refreshKey: '1' });
      expect(result).toMatchObject(auth);
    });
    test('Если "Пользователь" не найден по refresh ключу выбрасывается ошибка', async () => {
      repository.getUserByRefreshKey.mockResolvedValue(null);
      expect(userService.refreshToken({ refreshKey: '1' })).rejects.toThrowError();
    });
  });
  describe('Изменение учетной записи "Пользователем"', () => {
    const newUserInfo = {
      id: '1',
      name: 'Сидор',
      surname: 'Сидоров',
      patronymic: 'Сидорович',
      phone: '+79888888888',
      avatar: 'https://newimageurl.com',
    };
    test('"Пользователь" успешно запрашивает проверочный код', async () => {
      const user = new User(getUserFromCollection());
      const verificationCode = '7777';
      const userId = '1';
      repository.getUserById.mockResolvedValue(user);
      repository.setUserVerificationCode.mockResolvedValue('Ok');
      authTookit.generateVerificationCode.mockReturnValue(verificationCode);
      notifier.sendVerificationCode.mockResolvedValue('Ok');
      await userService.sendVerificationCode({ id: userId });
      expect(repository.setUserVerificationCode).toBeCalledWith(userId, verificationCode);
    });
    test('Если "Пользователь" не найден, выбрасывается ошибка', async () => {
      repository.getUserById.mockResolvedValue(null);
      expect(userService.sendVerificationCode({ id: '1' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно меняет пароль', async () => {
      const user = new User(getUserFromCollection());
      const newPassword = 'newPassword';
      const newHashedPassword = { salt: 'newSalt', hash: 'newHash' };
      repository.getUserByVerificationCode.mockResolvedValue(user);
      authTookit.getHash.mockResolvedValue(newHashedPassword);
      await userService.changePassword({ id: '1', password: newPassword, verificationCode: '2233' });
      expect(authTookit.getHash.mock.calls[0][0]).toBe(newPassword);
      expect(user.password).toBe(newHashedPassword);
    });
    test('Если "Пользователь" указал неверный код подтверждения, при смене парля, выбрасывается ошибка', async () => {
      repository.getUserByVerificationCode.mockResolvedValue(null);
      expect(
        userService.changePassword({ id: '1', password: 'qwerty', verificationCode: '2233' }),
      ).rejects.toThrowError();
    });
    test('"Пользователь" успешно меняет свою почту', async () => {
      const user = new User(getUserFromCollection());
      const newEmail = 'new@test.ru';
      repository.getUserByVerificationCode.mockResolvedValue(user);
      await userService.changeEmail({ id: '1', email: newEmail, verificationCode: '2233' });
      expect(user.email).toBe(newEmail);
    });
    test('Если "Пользователь" указал неверный код подтверждения, при смене почты, выбрасывается ошибка', async () => {
      repository.getUserByVerificationCode.mockResolvedValue(null);
      expect(userService.changeEmail({ id: '1', email: 'newEmail', verificationCode: '2233' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно меняет информацию о себе', async () => {
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      const result = await userService.update(newUserInfo);
      expect(result).toMatchObject(newUserInfo);
    });
    test('Если "Пользователь", при смене информации о себе, не найден, выбрасывается ошибка', async () => {
      repository.getUserById.mockResolvedValue(null);
      expect(userService.update(newUserInfo)).rejects.toThrowError();
    });
  });
  describe('Изменение положения и статуса "Пользователя" в системе', () => {
    test('Успешно меняется "Роль" "Пользователя"', async () => {
      const newRole = getRole(RoleType.Manager);
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      await userService.changeRole({ id: '1', role: newRole });
      expect(user.getView().role).toMatchObject(newRole);
    });
    test('Если при смене "Роли" "Пользователь" не найден, выбрасывается ошибка', async () => {
      const newRole = getRole(RoleType.Manager);
      repository.getUserById.mockResolvedValue(null);
      expect(userService.changeRole({ id: '1', role: newRole })).rejects.toThrowError();
    });
    test('Успешно меняется "Пространство" "Пользователя"', async () => {
      const newSpaceId = 'newSpaceId';
      const space = new Space(getSpace('Менеджеры проектов'));
      const user = new User(getUserFromCollection());
      repository.getSpaceById.mockResolvedValue(space);
      repository.getUserById.mockResolvedValue(user);
      await userService.changeSpace({ id: '1', spaceId: newSpaceId });
      expect(user.getView().spaceId).toBe(newSpaceId);
    });
    test('Если при смене "Пространства" "Пользователь" не найден, выбрасывается ошибка', async () => {
      repository.getUserById.mockResolvedValue(null);
      expect(userService.changeSpace({ id: '1', spaceId: '1' })).rejects.toThrowError();
    });
    test('Если при смене "Пространства" "Пространство" не найден, выбрасывается ошибка', async () => {
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      repository.getSpaceById.mockResolvedValue(null);
      expect(userService.changeSpace({ id: '1', spaceId: '1' })).rejects.toThrowError();
    });
    test('"Пользователь" успешно активируется', async () => {
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      await userService.changeActivity({ id: '1', active: true });
      expect(user.isActive()).toBeTruthy();
    });
    test('"Пользователь" успешно деактивируется', async () => {
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      await userService.changeActivity({ id: '1', active: false });
      expect(user.isActive()).toBeFalsy();
    });
    test('Если при смене ативности "Пользователь" не найден? выбрасывается ошибка', async () => {
      repository.getUserById.mockResolvedValue(null);
      expect(userService.changeActivity({ id: '1', active: false })).rejects.toThrowError();
    });
  });
  describe('Получение пользователей', () => {
    test('Представление "Пользователя" можно получить по id', async () => {
      const user = new User(getUserFromCollection());
      repository.getUserById.mockResolvedValue(user);
      const result = await userService.get({ id: '1' });
      expect(result).toMatchObject(user.getView());
    });
    test('Если при получении "Пользователя" по id он не найден, выбрасывается ошибка', async () => {
      repository.getUserById.mockResolvedValue(null);
      expect(userService.get({ id: '1' })).rejects.toThrowError();
    });
    test('Можно получить список "Пользователей"', async () => {
      const user1 = new User(getUserFromCollection());
      const user2 = new User(getUserFromCollection());
      repository.getUserList.mockResolvedValue({ total: 2, users: [user1, user2] });
      const result = await userService.getList({ spaceId: '1', limit: 100, offset: 100 });
      expect(result).toMatchObject({ total: 2, users: [user1.getView(), user2.getView()] });
    });
  });
  describe('Вручение "Пользователю" "Карточки"', () => {
    const putCommoCardParam = {
      userFromId: 'uuid',
      userToId: 'uuid',
      spaceFromId: 'uuid',
      name: 'Святой Валентин',
      description: 'Фиксит баги в выходные',
      image: 'base64',
      power: 100,
    };
    const putLegendaryCardParam = {
      id: '1',
      userFromId: 'uuid',
      userToId: 'uuid',
      spaceFromId: 'uuid',
    };
    test('"Пользователь" успешно дарит другому "Пользователю" обычную "Карточку"', async () => {
      const userFrom = new User(getUserFromCollection());
      const userTo = new User(getUserFromCollection());

      const startUserFromDustAmount = userFrom.dust;
      const startUserToCoinAmount = userTo.coins;

      const spaceFrom = new Space(getSpace());
      const card = new Card(getCard(putCommoCardParam.power));
      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      cardGenerator.makeCard.mockResolvedValue(card);
      repository.savePutCardResult.mockResolvedValue('Ok');

      await userService.putCard(putCommoCardParam);

      expect(userFrom.dust).toBe(startUserFromDustAmount - putCommoCardParam.power);
      expect(userTo.coins).toBe(startUserToCoinAmount + putCommoCardParam.power);
    });
    test('Если "Пользователь", которому дарят "Карточку" не найден, выбрасывается ошибка', async () => {
      const userFrom = new User(getUserFromCollection());
      const userTo = null;
      const spaceFrom = new Space(getSpace());

      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);

      expect(userService.putCard(putCommoCardParam)).rejects.toThrowError();
    });
    test('Если "Пользователь", который дарит "Карточку" не найден, выбрасывается ошибка', async () => {
      const userFrom = null;
      const userTo = new User(getUserFromCollection());
      const spaceFrom = new Space(getSpace());

      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);

      expect(userService.putCard(putCommoCardParam)).rejects.toThrowError();
    });
    test('Если "Пространство" "Пользователя" который дарит "Карточку" не найдено, выбрасывается ошибка', async () => {
      const userFrom = new User(getUserFromCollection());
      const userTo = new User(getUserFromCollection());
      const spaceFrom = null;

      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);

      expect(userService.putCard(putCommoCardParam)).rejects.toThrowError();
    });
    test('Если у обычного "Пользователя" недостаточно "Пыли" для оплаты "Карточки", выбрасывается ошибка', async () => {
      const userFrom = new User(getUserFromCollection());
      const userTo = new User(getUserFromCollection());

      const startUserFromDustAmount = userFrom.dust;
      const cardPrice = startUserFromDustAmount + 100;

      const spaceFrom = new Space(getSpace());
      const card = new Card(getCard(cardPrice));
      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      cardGenerator.makeCard.mockResolvedValue(card);

      expect(userService.putCard({ ...putCommoCardParam, power: cardPrice })).rejects.toThrowError();
    });
    test('"Пользователь" успешно дарит другому "Пользователю" легендарную "Карточку"', async () => {
      const legendaryCardPower = 900;
      const userFrom = new User(getUserFromCollection());
      const userTo = new User(getUserFromCollection());

      const startUserFromDustAmount = userFrom.dust;
      const startUserToCoinAmount = userTo.coins;

      const spaceFrom = new Space(getSpace());
      const card = new Card(getCard(legendaryCardPower, RarityType.Legendary));
      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      repository.getLegendaryCardById.mockResolvedValue(card);
      repository.savePutCardResult.mockResolvedValue('Ok');

      await userService.putLegendaryCard(putLegendaryCardParam);

      expect(userFrom.dust).toBe(startUserFromDustAmount - legendaryCardPower);
      expect(userTo.coins).toBe(startUserToCoinAmount + legendaryCardPower);
    });
    test('Если "Пользователю" в роли "Менеджер" не хватает "Пыли" то недостающая часть списывается с "Пространства" "Менеджера"', async () => {
      const legendaryCardPower = 1100;
      const userDustAmount = 1000;
      const spaceDustAmount = 1000;
      const userFrom = new User(getUserFromCollection(RoleType.Manager, userDustAmount));
      const userTo = new User(getUserFromCollection());

      const spaceFrom = new Space(getSpace('', spaceDustAmount));
      const card = new Card(getCard(legendaryCardPower, RarityType.Legendary));
      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      repository.getLegendaryCardById.mockResolvedValue(card);
      repository.removeLegendaryCardById.mockResolvedValue('Ok');
      repository.savePutCardResult.mockResolvedValue('Ok');

      await userService.putLegendaryCard(putLegendaryCardParam);

      expect(userFrom.dust).toBe(0);
      expect(spaceFrom.getDust()).toBe(spaceDustAmount + userDustAmount - legendaryCardPower);
    });
    test('Если "Пользователю" в роли "Менеджер" не хватает "Пыли" и ее не достаточно в "Пространства" выбрасывается ошибка', async () => {
      const legendaryCardPower = 1100;
      const userDustAmount = 1000;
      const spaceDustAmount = 10;
      const userFrom = new User(getUserFromCollection(RoleType.Manager, userDustAmount));
      const userTo = new User(getUserFromCollection());

      const spaceFrom = new Space(getSpace('', spaceDustAmount));
      const card = new Card(getCard(legendaryCardPower, RarityType.Legendary));
      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      repository.getLegendaryCardById.mockResolvedValue(card);

      expect(userService.putLegendaryCard(putLegendaryCardParam)).rejects.toThrowError();
    });
    test('Если легендарная "Карточка" не найдена выбрасывается ошибка', async () => {
      const userFrom = new User(getUserFromCollection());
      const userTo = new User(getUserFromCollection());

      const spaceFrom = new Space(getSpace());

      repository.getUserById.mockResolvedValueOnce(userFrom);
      repository.getUserById.mockResolvedValueOnce(userTo);
      repository.getSpaceById.mockResolvedValue(spaceFrom);
      repository.getLegendaryCardById.mockResolvedValue(null);

      expect(userService.putLegendaryCard(putLegendaryCardParam)).rejects.toThrowError();
    });
  });
});
