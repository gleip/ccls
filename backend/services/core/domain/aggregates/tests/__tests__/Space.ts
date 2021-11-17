import { Space } from '../../Space';
import { getSpace } from '../fixtures';

describe('Методы работы с "Пространством"', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date());
  });
  test('Пространство успешно создается', () => {
    const space = new Space(getSpace());
    expect(space.getView()).toMatchObject(getSpace());
  });
  test('Успешно создается активное пространство', () => {
    const space = new Space(getSpace());
    expect(space.isActive()).toBeTruthy();
  });
  test('Пространство можно сделать неактивным', () => {
    const space = new Space(getSpace());
    space.deactivate();
    expect(space.isActive()).toBeFalsy();
  });
});
