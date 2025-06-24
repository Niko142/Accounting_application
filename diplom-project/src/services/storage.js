import { categoryPathMap } from 'components/Storage/config/config';
import { instance } from './api';
import { STORAGE_PATH, COMPUTER_PATH } from 'constants/path';

// Запрос на получение истории замен комплектующих ПК
export const fetchChangeDetailsHistory = async (signal) => {
  try {
    const res = await instance.get(`${STORAGE_PATH}/component-changes`, {
      signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      console.error('Ошибка при выполнении запроса', error);
      throw new Error('Ошибка при выполнении запроса', error.message);
    }
    throw error;
  }
};

// Запрос на получение данных о комплектующих
export const fetchComponentData = async ({ component, signal }) => {
  try {
    const res = await instance.get(`${COMPUTER_PATH}/${component}/`, {
      signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      console.error('Ошибка при выполнении запроса', error);
      throw new Error('Ошибка при выполнении запроса', error.message);
    }
    throw error;
  }
};

// Запрос на удаление комплектующего
export const deleteComponentFromStorage = async ({ component, id }) => {
  try {
    const response = await instance.delete(
      `${COMPUTER_PATH}/${component}/${id}`,
    );
    return {
      success: true,
      message: response.data?.message || 'Комплектующее успешно удалено',
    };
  } catch (err) {
    console.log('Ошибка при удалении комплектующего');
    return {
      success: false,
      message: err.response?.data?.message || 'Не удалось удалить объект',
    };
  }
};

// Запрос на получение данных об объектах разной категории и типов
export const fetchObjectData = async ({ object, signal }) => {
  try {
    const res = await instance.get(
      `/api/${categoryPathMap[object]}/warehouse`,
      { signal },
    );
    return res.data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      console.error('Ошибка при выполнении запроса: ', error);
      throw new Error('Ошибка при выполнении запроса: ', error.name);
    }
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
    await instance.post(`${STORAGE_PATH}/disposals`, {
      date,
      category,
      type,
      number,
      model,
      reason,
    });
    const deleteResponse = await instance.delete(
      `/api/${categoryPathMap[object]}/${number}`,
    );
    return {
      success: true,
      message: deleteResponse.data?.message || 'Объект успешно утилизирован',
      data: deleteResponse,
    };
  } catch (err) {
    console.error('Ошибка при выполнении утилизации', err);
    return {
      success: false,
      message: err.response?.data?.message || 'Не удалось утилизировать объект',
    };
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
    await instance.post(`${STORAGE_PATH}/repair-orders`, {
      date,
      category,
      type,
      model,
      number,
      end,
      description,
    });
    // Проверить корректность запроса
    const repairResponse = await instance.put(
      `/api/${categoryPathMap[object]}/${number}/repair-status`,
      {
        status: 'В ремонте',
        location: '-',
      },
    );
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
  old_part,
  new_part,
  date,
  computerId,
  oldComponentId,
  newComponentId,
  config,
}) => {
  try {
    // Формирование записи истории замены
    const response = await instance.post(
      `${STORAGE_PATH}/component-replacements`,
      {
        name,
        type,
        old_part,
        new_part,
        date,
      },
    );

    // Обновление Id компонента в таблице с компьютерами
    await instance.put(`${COMPUTER_PATH}/${config.apiUpdate}/${computerId}`, {
      [config.componentKey]: +newComponentId,
    });

    // Обновление местоположения замененного компонента
    await instance.put(
      `${COMPUTER_PATH}/${config.apiLocation}/${oldComponentId}`,
      {
        location: 'Склад',
      },
    );

    // Обновление местоположения нового компонента компьютера
    await instance.put(
      `${COMPUTER_PATH}/${config.apiLocation}/${+newComponentId}`,
      {
        location: name,
      },
    );
    return {
      success: true,
      message: response.data?.message || 'Компонент заменён',
    };
  } catch (err) {
    console.error('Ошибка при замене комплектующего', err);
    return { success: false, message: 'Не удалось заменить комплектующее' };
  }
};
