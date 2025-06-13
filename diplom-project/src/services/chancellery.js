import { instance } from './api';

export async function fetchData(controller) {
  try {
    const res = await instance.get('/chancellery', {
      signal: controller.signal,
    });
    return res.data;
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
    throw err;
  }
}

export const selectChancellery = async (id) => {
  try {
    const res = await instance.get(`/select_chancellery/${id}`);
    const result = res.data;
    if (result.length > 0) {
      return {
        name: result[0].name,
        id: result[0].id_chancellery,
        amounts: result[0].amounts,
      };
    } else {
      console.warn('Запрашиваемый товар не найден');
      return null;
    }
  } catch (error) {
    throw new Error('Не удалось выбрать категорию');
  }
};

export const deleteChancellery = async (id) => {
  try {
    await instance.delete(`/delete-chancellery/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};

export const addChancellery = async (req) => {
  try {
    const response = await instance.post('/add-chancellery', req);
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
    const response = await instance.patch('/update-chancellery', req);
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
