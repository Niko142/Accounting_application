import { instance } from './api';
import { MOVEMENT_PATH } from 'constants/path';

export const fetchCabinetInfo = async (controller) => {
  try {
    const res = await instance.get(`${MOVEMENT_PATH}/audiences`, {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      throw new Error('Ошибка при загрузке данных', error);
    }
    throw error;
  }
};

export const fetchHistoryMovement = async (controller) => {
  try {
    const res = await instance.get(`${MOVEMENT_PATH}/pinning-history`, {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      throw new Error('Ошибка при загрузке данных', error);
    }
    throw error;
  }
};

const categoriesEndpoints = [
  { key: 'Все', endpoint: 'repairs' },
  { key: 'Компьютер', endpoint: 'repairs-computers' },
  { key: 'Ноутбук', endpoint: 'repairs-laptops' },
  { key: 'Монитор', endpoint: 'repairs-screens' },
  { key: 'МФУ', endpoint: 'repairs-scanners' },
  { key: 'Камера', endpoint: 'repairs-cameras' },
  { key: 'Мебель', endpoint: 'repairs-furniture' },
  { key: 'Система вентиляции', endpoint: 'repairs-ventilations' },
];

export const fetchRepairData = async (controller) => {
  try {
    const requests = categoriesEndpoints.map(({ endpoint }) =>
      instance.get(`${MOVEMENT_PATH}/${endpoint}`, {
        signal: controller.signal,
      }),
    );

    const results = await Promise.all(requests);

    const data = categoriesEndpoints.reduce((acc, { key }, index) => {
      acc[key] = results[index].data;
      return acc;
    }, {});

    return data;
  } catch (error) {
    if (error.name !== 'CanceledError') {
      throw new Error('Ошибка при загрузке данных', error);
    }
    throw error;
  }
};

export const fetchStorageData = async (
  endpoint,
  valueKey = 'model',
  idKey,
  controller,
) => {
  try {
    const res = await instance.get(`/api/${endpoint}/warehouse`, {
      signal: controller.signal,
    });

    return res.data.map((item) => ({
      value: item[valueKey],
      label: item[valueKey],
      key: item[idKey],
      [idKey]: item[idKey], // Динамическое свойство
    }));
  } catch (error) {
    if (error.name !== 'CanceledError') {
      console.error(`Ошибка при загрузке ${endpoint}:`, error.message);
      throw new Error(`Не удалось загрузить ${endpoint}`);
    }
    throw error;
  }
};

// Запрос на получение объектов на складе на основе общего запроса
export const fetchAllStorageItems = async (setItems, controller) => {
  // перебор endpoint-ов
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
      const items = await fetchStorageData(
        endpoint,
        valueKey,
        idKey,
        controller,
      );
      return { key, items };
    }),
  );

  // Записываем полученные результаты в state
  setItems((prev) => ({
    ...prev,
    ...Object.fromEntries(results.map(({ key, items }) => [key, items])),
  }));
};

export const pinningItemForAudience = async ({
  endpoint,
  itemsKey,
  idState,
  itemsState,
  audience,
  formData,
}) => {
  // Валидация входных данных
  if (!idState[itemsKey]) {
    throw new Error('Ошибка: объект не выбран');
  }

  if (!audience?.value) {
    throw new Error('Ошибка: аудитория не выбрана');
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
      instance.post(`${MOVEMENT_PATH}/pinning-audience`, {
        date: formData.date,
        category: formData.category,
        type: formData.type,
        reason: 'Введение в эксплуатацию',
        unit: selectedObject.label,
        start: 'Склад',
        end: audience.value,
      }),
      instance.patch(`/${endpoint}/${idState[itemsKey]}`, {
        location: audience.value,
        status: 'В эксплуатации',
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
