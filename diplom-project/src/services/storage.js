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

// Запрос для утилизации объекта
// export const utilizationObjectRecord = async (req) => {
//   try {
//     await instance.post('/utilization', req);
//     return { success: true, message: 'Объект успешно утилизирован' };
//   } catch (err) {
//     console.log('Возникла ошибка при утилизации объекта', err);
//     return { success: false, message: 'Не удалось утилизировать объект' };
//   }
// };

// сделать универсальным
export const utilizeObject = async ({
  date,
  category,
  type,
  number,
  model,
  reason,
}) => {
  await instance.post('http://localhost:3001/utilization', {
    date,
    category,
    type,
    number,
    model,
    reason,
  });
  return await instance.delete('http://localhost:3001/delete-laptop', {
    id: number,
  });
};

// export const repairObjectRecord = async (req) => {
//   try {
//     await instance.post('/repair', req);
//     return { success: true, message: 'Объект успешно отправлен в ремонт' };
//   } catch (err) {
//     console.log('Возникла ошибка при отправке объекта в ремонт', err);
//     return { success: false, message: 'Не удалось отправить объект в ремонт' };
//   }
// };

export const repairObject = async ({
  date,
  category,
  type,
  model,
  number,
  end,
  description,
}) => {
  await instance.post('http://localhost:3001/repair', {
    date,
    category,
    type,
    model,
    number,
    end,
    description,
  });
  return await instance.post('http://localhost:3001/repair_laptop', {
    status: 'В ремонте',
    location: '-',
    id: number,
  });
};
