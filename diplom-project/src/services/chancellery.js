import Axios from 'axios';

export async function fetchData(control, setState) {
  try {
    const res = await Axios.get('http://localhost:3001/chancellery', {
      signal: control.signal,
    });
    setState(res.data);
  } catch (err) {
    console.log(err);
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
    console.log(res);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

export const deleteChancellery = async (id) => {
  try {
    const res = await Axios.delete(
      `http://localhost:3001/delete-chancellery/${id}`,
    );
    console.log(res);
    window.location.reload();
  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
};

export const addChancellery = async (req, alert) => {
  try {
    const res = await Axios.post('http://localhost:3001/add-chancellery', req);
    if (res.data.message === 'Успешное добавление') {
      window.location.reload();
    } else {
      alert.error('Ошибка при добавлении товарной группы');
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    alert.error('Ошибка при добавлении товарной группы');
  }
};

export const editAmounts = async (req, alert) => {
  try {
    const res = await Axios.post(
      'http://localhost:3001/update-chancellery',
      req,
    );
    if (res.data.message === 'Успех') {
      window.location.reload();
    } else {
      alert.error('Ошибка при изменении количества товаров');
    }
  } catch (error) {
    console.error('Ошибка при изменении количества:', error);
    alert.error('Ошибка при выполнении запроса');
  }
};
