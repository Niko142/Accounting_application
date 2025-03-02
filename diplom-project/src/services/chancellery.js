import Axios from 'axios';

export async function fetchData(abortController, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/chancellery', {
      signal: abortController.signal,
    });
    setState(res.data);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Ошибка при загрузке данных:', err);
    }
  }
}

export const selectChancellery = async (id, setState) => {
  try {
    const res = await Axios.get(
      `http://localhost:3001/select_chancellery/${id}`,
    );
    const result = res.data;
    if (result.length > 0) {
      setState({
        name: result[0].name,
        id: result[0].id_chancellery,
        amounts: result[0].amounts,
      });
    } else {
      console.warn('Запрашиваемый товар не найден');
    }
  } catch (error) {
    throw new Error('Не удалось выбрать категорию');
  }
};

export const deleteChancellery = async (id) => {
  try {
    await Axios.delete(`http://localhost:3001/delete-chancellery/${id}`);
  } catch (error) {
    throw new Error('Ошибка при удалении');
  }
};

export const addChancellery = async (req) => {
  try {
    const res = await Axios.post('http://localhost:3001/add-chancellery', req);
    if (res.data.message !== 'Успешное добавление') {
      throw new Error('Ошибка при добавлении товарной группы');
    }
  } catch (error) {
    throw new Error('Ошибка при добавлении товарной группы');
  }
};

export const editAmounts = async (req) => {
  try {
    const res = await Axios.post(
      'http://localhost:3001/update-chancellery',
      req,
    );
    if (res.data.message !== 'Успех') {
      throw new Error('Ошибка при изменении количества товаров в категории');
    }
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
};
