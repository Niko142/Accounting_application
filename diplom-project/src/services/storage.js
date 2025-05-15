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
    console.log('Ошибка при выполнении запроса: ', error);
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

export const utilizeObject = async ({
  date,
  category,
  type,
  number,
  model,
  reason,
  object,
}) => {
  try {
    await instance.post('/utilization', {
      date,
      category,
      type,
      number,
      model,
      reason,
    });
    const deleteResponse = await instance.delete(`/delete-${object}`, {
      data: { id: number },
    });
    return {
      success: true,
      message: 'Объект успешно утилизирован',
      data: deleteResponse,
    };
  } catch (err) {
    console.error('Ошибка при выполнении утилизации', err);
    return { success: false, message: 'Не удалось утилизировать объект' };
  }
};

export const repairObject = async ({
  date,
  category,
  type,
  model,
  number,
  end,
  description,
  object,
}) => {
  try {
    await instance.post('/repair', {
      date,
      category,
      type,
      model,
      number,
      end,
      description,
    });
    const repairResponse = await instance.post(`/repair_${object}`, {
      status: 'В ремонте',
      location: '-',
      id: number,
    });
    return {
      success: true,
      message: 'Объект успешно отправлен в ремонт',
      data: repairResponse,
    };
  } catch (err) {
    console.error('Ошибка при отправке объекта в ремонт', err);
    return { success: false, message: 'Не удалось отправить объект в ремонт' };
  }
};

export const replaceDetailsComputer = async ({
  name,
  type,
  start,
  end,
  date,
  computerId,
  oldComponentId,
  newComponentId,
  config,
}) => {
  try {
    // Формирование записи истории замены
    await instance.post('/replace', {
      name,
      type,
      start,
      end,
      date,
    });
    // Обновление Id компонента в таблице с компьютерами
    await instance.patch(`/${config.apiUpdate}`, {
      [config.componentKey]: +newComponentId,
      id: computerId,
    });

    // Обновление местоположения замененного компонента
    await instance.patch(`/${config.apiLocation}`, {
      location: 'Склад',
      id: oldComponentId,
    });

    // Обновление местоположения нового компонента компьютера
    await instance.patch(`/${config.apiLocation}`, {
      location: name,
      id: +newComponentId,
    });
    return { success: true, message: 'Компонент заменён' };
  } catch (err) {
    console.error('Ошибка при замене комплектующего', err);
    return { success: false, message: 'Не удалось заменить комплектующее' };
  }
};
