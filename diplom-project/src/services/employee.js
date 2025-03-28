// import Axios from 'axios';
import { instance } from './api';

// Запросы не напрямую передавая state
export async function getPinningEmployee(controller) {
  try {
    const res = await instance.get('/select_pinning', {
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
    const res = await instance.get('/select_employee', {
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
    const res = await instance.post('/add-employee', req);
    if (res.data.message !== 'Успешное добавление') {
      throw new Error('Ошибка при добавлении нового сотрудника');
    }
  } catch (error) {
    throw new Error('Ошибка при добавлении нового сотрудника');
  }
};

export const deleteEmployee = async (id) => {
  try {
    await instance.delete(`/delete-employee/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};
