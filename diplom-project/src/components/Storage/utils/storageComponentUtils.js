import { objCategories, objNames } from '../config/config';

// Вывод объекта в зависимости от столбцов в БД
export function getObjName(objectType, object) {
  if (!object) {
    return '';
  }
  const getName = objNames.get(objectType);
  return getName ? getName(object) : object.model;
}

// Определение категории объекта в зависимости от его типа
export function getObjCategory(type) {
  return objCategories.get(type) ?? 'Оргтехника';
}
