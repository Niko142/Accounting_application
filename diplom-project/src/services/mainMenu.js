import { instance } from './api';

export async function fetchData(endpoint, controller) {
  try {
    const res = await instance.get(`/${endpoint}`, {
      signal: controller.signal,
    });
    return res.data;
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error(`Ошибка при загрузке данных (${endpoint}):`, err);
    }
  }
}

export async function fetchUtilization(controller) {
  try {
    const res = await instance.get('/select_utilization', {
      signal: controller.signal,
    });
    return res.data;
  } catch (err) {
    if (err.name !== 'CanceledError') {
      console.error('Ошибка при загрузке данных:', err);
    }
    throw err;
  }
}
