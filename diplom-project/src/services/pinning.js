import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export async function getEmployees(abortController) {
  try {
    const res = await Axios.get(`${API_URL}/select_employee`, {
      signal: abortController.signal,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка загрузки сотрудников:', err);
    }
    return [];
  }
}

export async function getItemsByType(itemType, abortController) {
  const endpoints = {
    computer: `${API_URL}/computer`,
    laptop: `${API_URL}/select_laptop`,
    screen: `${API_URL}/select_screen`,
    scanner: `${API_URL}/select_scanner`,
    camera: `${API_URL}/select_camera`,
    furniture: `${API_URL}/select_furniture`,
    ventilation: `${API_URL}/select_ventilation`,
  };

  if (!endpoints[itemType]) return [];

  try {
    const res = await Axios.get(endpoints[itemType], {
      signal: abortController.signal,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error(`Ошибка загрузки ${itemType}:`, err);
    }
    return [];
  }
}

export async function pinEmployeeToItem(formData) {
  try {
    const res = await Axios.post(`${API_URL}/pinning-employee`, formData);
    return res.data.message === 'Успешное добавление';
  } catch (err) {
    console.error('Ошибка закрепления:', err);
    return false;
  }
}

export async function updatePinnedItem(itemType, formData) {
  try {
    const res = await Axios.post(`${API_URL}/update_${itemType}`, formData);
    return res.data.message === 'Успешное добавление';
  } catch (err) {
    console.error(`Ошибка обновления ${itemType}:`, err);
    return false;
  }
}
