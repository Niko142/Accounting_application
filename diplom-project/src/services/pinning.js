import Axios from 'axios';
import { instance } from './api';
import { EMPLOYEE_PATH } from 'constants/path';

const fetchItems = async (endpoint, valueKey = 'model', idKey, controller) => {
  try {
    const res = await instance.get(`/api/${endpoint}/`, {
      signal: controller?.signal,
    });

    return res.data.map((item) => ({
      value: item[valueKey],
      label: item[valueKey],
      key: item[idKey],
      [idKey]: item[idKey], // Динамическое свойство
    }));
  } catch (error) {
    if (Axios.isCancel(error)) {
      console.log(`Запрос ${endpoint} отменен`);
    } else {
      console.error(`Ошибка при загрузке ${endpoint}:`, error.message);
      throw new Error(`Не удалось загрузить ${endpoint}`);
    }
  }
};

export const fetchAllItems = async (setItems, controller) => {
  // endpoint-ы, по которым происходит дальнейший перебор
  const endpoints = [
    {
      key: 'computers',
      endpoint: 'computers',
      valueKey: 'name',
      idKey: 'id_computer',
    },
    {
      key: 'laptops',
      endpoint: 'laptops',
      valueKey: 'model',
      idKey: 'laptop_id',
    },
    {
      key: 'screens',
      endpoint: 'screens',
      valueKey: 'model',
      idKey: 'screen_id',
    },
    {
      key: 'scanners',
      endpoint: 'scanners',
      valueKey: 'nam',
      idKey: 'scanner_id',
    },
    {
      key: 'cameras',
      endpoint: 'cameras',
      valueKey: 'model',
      idKey: 'camera_id',
    },
    {
      key: 'furniture',
      endpoint: 'furniture',
      valueKey: 'name',
      idKey: 'furniture_id',
    },
    {
      key: 'ventilation',
      endpoint: 'ventilations',
      valueKey: 'model',
      idKey: 'ventilation_id',
    },
  ];

  const results = await Promise.all(
    endpoints.map(async ({ key, endpoint, valueKey, idKey }) => {
      const items = await fetchItems(endpoint, valueKey, idKey, controller);
      return { key, items };
    }),
  );

  // Записываем полученные результаты в state
  setItems((prev) => ({
    ...prev,
    ...Object.fromEntries(results.map(({ key, items }) => [key, items])),
  }));
};

export const pinningItem = async ({
  endpoint,
  itemsKey,
  idState,
  itemsState,
  employee,
  formData,
}) => {
  // Валидация входных данных
  if (!idState[itemsKey]) {
    throw new Error('Ошибка: объект не выбран');
  }

  if (!employee?.key) {
    throw new Error('Ошибка: сотрудник не выбран');
  }
  // Находим выбранный объект
  const selectedObject = itemsState[itemsKey]?.find(
    (obj) =>
      obj.key === idState[itemsKey] ||
      obj[`${itemsKey.slice(0, -1)}_id`] === idState[itemsKey],
  );

  if (!selectedObject) {
    throw new Error('Выбранный объект не найден');
  }

  try {
    // Отправка запросов
    const [pinningRes, updateRes] = await Promise.all([
      instance.post(`${EMPLOYEE_PATH}/pinning-employee`, {
        date: formData.date,
        category: formData.category,
        type: formData.type,
        unit: selectedObject.label,
        employee: employee.key,
      }),
      instance.put(`/${endpoint}/${idState[itemsKey]}`, {
        employee: employee.key,
      }),
    ]);

    // Валидация результата закрепления объекта
    if (pinningRes.status === 200 && updateRes.status === 200) {
      console.log('Объект успешно закреплен:', updateRes.data.message);
      return {
        success: true,
        pinningData: pinningRes.data,
        updateData: updateRes.data,
      };
    } else {
      throw new Error('Ошибка при закреплении объекта');
    }
  } catch (error) {
    console.error('Ошибка при закреплении объекта', error);
    if (error.isAxiosError) {
      throw new Error('Ошибка сервера при закреплении');
    }
    throw error;
  }
};
