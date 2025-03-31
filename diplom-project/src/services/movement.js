import { instance } from './api';

export const fetchCabinetInfo = async (controller) => {
  try {
    const res = await instance.get('/cabinet', {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных: ', error);
    }
    throw error;
  }
};

export const fetchHistoryMovement = async (controller) => {
  try {
    const res = await instance.get('/history-cabinet', {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных: ', error);
    }
    throw error;
  }
};
