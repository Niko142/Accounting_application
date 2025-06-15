import Axios from 'axios';

export const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена к каждому запросу
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Интерцептор для обработки ответов
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Если токен недействителен
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Очищаем localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default instance;
