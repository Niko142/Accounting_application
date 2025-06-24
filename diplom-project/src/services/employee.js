import { instance } from './api';
import { EMPLOYEE_PATH } from 'constants/path';

// Запросы не напрямую передавая state
export async function getPinningEmployee(controller) {
  try {
    const res = await instance.get(`${EMPLOYEE_PATH}/pinning-history`, {
      signal: controller.signal,
    });
    return Array.isArray(res.data) ? res.data : []; // Проверка, что это массив
  } catch (err) {
    if (err.name !== 'CanceledError') {
      throw new Error('Ошибка при загрузке данных', err);
    }
    return [];
  }
}

export async function fetchEmployee(controller) {
  try {
    const res = await instance.get(`${EMPLOYEE_PATH}/employees`, {
      signal: controller.signal,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    if (err.name !== 'CanceledError') {
      throw new Error('Ошибка при загрузке данных', err);
    }
    return [];
  }
}

export const addEmployee = async (req) => {
  try {
    await instance.post(`${EMPLOYEE_PATH}/employees`, req);
  } catch (error) {
    throw new Error('Ошибка при добавлении нового сотрудника');
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await instance.delete(`${EMPLOYEE_PATH}/layoff/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Ошибка при удалении сотрудника');
  }
};
