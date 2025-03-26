import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchItems = async (
  endpoint,
  key,
  valueKey = 'model',
  idKey,
  setItems,
  controller,
) => {
  try {
    const res = await Axios.get(`${API_URL}/${endpoint}`, {
      signal: controller.signal,
    });

    const arr = res.data.map((item) => ({
      value: item[valueKey],
      label: item[valueKey],
      key: item[idKey],
      [`${idKey}`]: item[idKey],
    }));

    setItems((prev) => ({ ...prev, [key]: arr }));
    return true;
  } catch (error) {
    if (Axios.isCancel(error)) {
      console.log(`Запрос ${endpoint} отменен`);
    } else {
      throw new Error(`Не удалось загрузить ${key}`);
    }
    throw error;
  }
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
