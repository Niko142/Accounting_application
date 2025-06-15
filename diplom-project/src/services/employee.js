import { instance } from './api';

const API_PATH = '/api/employee';

// Запросы не напрямую передавая state
export async function getPinningEmployee(controller) {
  try {
    const res = await instance.get(`${API_PATH}/select_pinning`, {
      signal: controller.signal,
    });
    return Array.isArray(res.data) ? res.data : []; // Проверка, что это массив
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
    return [];
  }
}

export async function fetchEmployee(controller) {
  try {
    const res = await instance.get(`${API_PATH}/select_employee`, {
      signal: controller.signal,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
    return [];
  }
}

export const addEmployee = async (req) => {
  try {
    await instance.post(`${API_PATH}/add`, req);
  } catch (error) {
    throw new Error('Ошибка при добавлении нового сотрудника');
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await instance.delete(`${API_PATH}/layoff/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Ошибка при удалении сотрудника');
  }
};
