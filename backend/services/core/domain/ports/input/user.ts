import { ICard, IUser } from '../../interfaces';

interface Password {
  password: string;
}

interface VerificationCode {
  id: string;
  verificationCode: string;
}

interface PutCardInfo {
  userFromId: string;
  userToId: string;
  spaceFromId: string;
}

export interface Pagination {
  limit: number;
  offset?: number;
}

/**
 * Команда на регистрацию "пользователя"
 */
export type Register = Pick<IUser, 'email' | 'name' | 'surname' | 'patronymic' | 'spaceId' | 'phone'> & Password;

/**
 * Отправка проверочного кода
 */
export type SendVerificationCode = Pick<IUser, 'id'>;

/**
 * Команда на смену пароля "пользователя"
 */
export type ChangePassword = VerificationCode & Password;

/**
 * Команда на смену email "пользователя"
 */
export type ChangeEmail = VerificationCode & { email: string };

/**
 * Команда на обновление информации о "пользователе"
 */
export type Update = Partial<Pick<IUser, 'avatar' | 'name' | 'surname' | 'patronymic' | 'phone'>> & Pick<IUser, 'id'>;

/**
 * Команда на изменение роли "пользователя"
 */
export type ChangeRole = Pick<IUser, 'id'> & { roleId: string };

/**
 * Команда на изменение "пространства" "пользователя"
 */
export type ChangeSpace = Pick<IUser, 'id'> & Required<Pick<IUser, 'spaceId'>>;

/**
 * Команда на выход "пользователя" из системы
 */
export type SignIn = Pick<IUser, 'email'> & Password;

/**
 * Команда на переполучение токена "пользователя"
 */
export type RefreshToken = { refreshKey: string };

/**
 * Команда на активировацию или деактивировацию "пользователя"
 */
export type ChangeUserActivity = Pick<IUser, 'id' | 'active'>;

/**
 * Команда на передачу обычной или редкой "карточки" другому "пользователю"
 */
export type PutCard = Pick<ICard, 'name' | 'description' | 'power' | 'image'> & PutCardInfo;

/**
 * Команда на передачу легендарной "карточки" другому "пользователю"
 */
export type PutLegendaryCard = Pick<ICard, 'id'> & PutCardInfo;

/**
 * Запрос на получение списка "пользователей"
 */
export type GetUserList = Partial<Pick<IUser, 'spaceId'>> & Pagination;

/**
 * Запрос на получение "пользователя"
 */
export type GetUser = Pick<IUser, 'id'>;
