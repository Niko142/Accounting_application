import { instance } from './api';

// Запрос на получение истории замен комплектующих ПК
export const fetchChangeDetailsHistory = async (signal) => {
  try {
    const res = await instance.get('/change', { signal });
    return res.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.log('Ошибка при выполнении запроса', error);
    }
    throw error;
  }
};

// Запрос на получение данных о комплектующих
export const fetchComponentData = async ({ component, signal }) => {
  try {
    const res = await instance.get(`/${component}`, { signal });
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса: ', error);
    throw error;
  }
};

// Запрос на удаление комплектующего
export const deleteComponentFromStorage = async ({ component, id }) => {
  try {
    await instance.delete(`/delete-${component}/${id}`);
    return { success: true, message: 'Комплектующее успешно удалено' };
  } catch (err) {
    console.log('Возникла ошибка при удалении комплектующего');
    return { success: false, message: 'Не удалось удалить объект' };
  }
};

// Запрос на получение данных об объектах разной категории и типов
export const fetchObjectData = async ({ object, signal }) => {
  try {
    const res = await instance.get(`/sklad_${object}`, { signal });
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса: ', error);
    throw error;
  }
};
