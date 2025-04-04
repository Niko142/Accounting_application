import { instance } from './api';

export const fetchCabinetInfo = async (controller) => {
  try {
    const res = await instance.get('/cabinet', {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных: ', error);
    }
    throw error;
  }
};

export const fetchHistoryMovement = async (controller) => {
  try {
    const res = await instance.get('/history-cabinet', {
      signal: controller.signal,
    });
    return res.data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных: ', error);
    }
    throw error;
  }
};

const categoriesEndpoints = [
  { key: 'Все', endpoint: 'select_repair' },
  { key: 'Компьютер', endpoint: 'select_repair_computer' },
  { key: 'Ноутбук', endpoint: 'select_repair_laptop' },
  { key: 'Монитор', endpoint: 'select_repair_screen' },
  { key: 'МФУ', endpoint: 'select_repair_scanner' },
  { key: 'Камера', endpoint: 'select_repair_camera' },
  { key: 'Мебель', endpoint: 'select_repair_furniture' },
  { key: 'Система вентиляции', endpoint: 'select_repair_ventilation' },
];

export const fetchRepairData = async (controller) => {
  try {
    const requests = categoriesEndpoints.map(({ endpoint }) =>
      instance.get(`/${endpoint}`, { signal: controller.signal }),
    );

    const results = await Promise.all(requests);

    const data = categoriesEndpoints.reduce((acc, { key }, index) => {
      acc[key] = results[index].data;
      return acc;
    }, {});

    return data;
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных: ', error);
    }
    throw error;
  }
};
