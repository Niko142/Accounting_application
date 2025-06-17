import { instance } from './api';

const API_PATH = '/api/chancellery';

export async function fetchData(controller) {
  try {
    const res = await instance.get(`${API_PATH}/`, {
      signal: controller.signal,
    });
    return res.data;
  } catch (err) {
    if (err.name !== 'AbortError') {
      throw new Error('Ошибка при загрузке данных', err);
    }
    throw err;
  }
}

export const selectChancellery = async (id) => {
  try {
    const res = await instance.get(`${API_PATH}/${id}`);
    const result = res.data;

    if (result.item) {
      return {
        name: result.item.name,
        id: result.item.id_chancellery,
        amounts: result.item.amounts,
      };
    } else if (result.length > 0) {
      return {
        name: result[0].name,
        id: result[0].id_chancellery,
        amounts: result[0].amounts,
      };
    } else {
      console.error('Запрашиваемый товар не найден');
      return null;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteChancellery = async (id) => {
  try {
    await instance.delete(`${API_PATH}/delete/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};

export const addChancellery = async (req) => {
  try {
    const response = await instance.post(`${API_PATH}/add`, req);
    if (response.status === 201) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const editAmounts = async (req) => {
  try {
    const response = await instance.patch(`${API_PATH}/update`, req);
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
