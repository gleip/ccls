import { Space } from '../Space';

describe('Методы работы с пространством', () => {
  const createParam = { id: '1', name: 'Разработка', active: true, dust: { amount: 1000 } };
  test('Пространство успешно создается', () => {
    const space = new Space(createParam);
    expect(space.getView()).toMatchObject(createParam);
  });
  test('Успешно создается активное пространство', () => {
    const space = new Space(createParam);
    expect(space.isActive()).toBeTruthy();
  });
  test('Пространство можно сделать неактивным', () => {
    const space = new Space(createParam);
    space.deactivate();
    expect(space.isActive()).toBeFalsy();
  });
});
