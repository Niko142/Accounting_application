import Axios from 'axios';

// Запросы не напрямую передавая state
export async function getPinningEmployee(abortController) {
  try {
    const res = await Axios.get('http://localhost:3001/select_pinning', {
      signal: abortController.signal,
    });
    return Array.isArray(res.data) ? res.data : []; // Проверка, что это массив
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
    return [];
  }
}

export async function fetchEmployee(abortController) {
  try {
    const res = await Axios.get('http://localhost:3001/select_employee', {
      signal: abortController.signal,
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
    const res = await Axios.post('http://localhost:3001/add-employee', req);
    if (res.data.message !== 'Успешное добавление') {
      throw new Error('Ошибка при добавлении нового сотрудника');
    }
  } catch (error) {
    throw new Error('Ошибка при добавлении нового сотрудника');
  }
};

export const deleteEmployee = async (id) => {
  try {
    await Axios.delete(`http://localhost:3001/delete-employee/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};
