import Axios from 'axios';

export async function fetchData(endpoint, abortController) {
  try {
    const res = await Axios.get(`http://localhost:3001/${endpoint}`, {
      signal: abortController.signal,
    });
    return res.data;
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error(`Ошибка при загрузке данных (${endpoint}):`, err);
    }
  }
}
