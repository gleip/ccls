export const envValidate = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Не установлена обязательная настройка: ${name}`) 
  }
  return value;
}