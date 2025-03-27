import Axios from 'axios';

const API_URL = 'http://localhost:3001';

const fetchItems = async (endpoint, valueKey = 'model', idKey, controller) => {
  try {
    const res = await Axios.get(`${API_URL}/${endpoint}`, {
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
      endpoint: 'computer',
      valueKey: 'name',
      idKey: 'id_computer',
    },
    {
      key: 'laptops',
      endpoint: 'select_laptop',
      valueKey: 'model',
      idKey: 'laptop_id',
    },
    {
      key: 'screens',
      endpoint: 'select_screen',
      valueKey: 'model',
      idKey: 'screen_id',
    },
    {
      key: 'scanners',
      endpoint: 'select_scanner',
      valueKey: 'nam',
      idKey: 'scanner_id',
    },
    {
      key: 'cameras',
      endpoint: 'select_camera',
      valueKey: 'model',
      idKey: 'camera_id',
    },
    {
      key: 'furniture',
      endpoint: 'select_furniture',
      valueKey: 'name',
      idKey: 'furniture_id',
    },
    {
      key: 'ventilation',
      endpoint: 'select_ventilation',
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
      Axios.post(`${API_URL}/pinning-employee`, {
        date: formData.date,
        category: formData.category,
        type: formData.type,
        unit: selectedObject.label,
        employee: employee.key,
      }),
      Axios.post(`${API_URL}/${endpoint}`, {
        employee: employee.key,
        id: idState[itemsKey],
      }),
    ]);

    // Алерты
    if (
      !(
        pinningRes.data.message === 'Успешное добавление' &&
        updateRes.data.message === 'Успешное добавление'
      )
    ) {
      throw new Error('Ошибка при закреплении объекта');
    }
    return true;
  } catch (error) {
    if (error.isAxiosError) {
      throw new Error('Ошибка сервера при закреплении');
    }
    throw error;
  }
};
