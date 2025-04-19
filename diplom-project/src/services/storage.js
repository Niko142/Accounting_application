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
