import { AUTH_PATH } from 'constants/path';
import {
  React,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { instance } from 'services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  // Авторизированный пользователь
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Токен авторизации
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null,
  );

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = async (username, password) => {
    try {
      const response = await instance.post(`${AUTH_PATH}/login`, {
        username: username.trim(),
        password: password.trim(),
      });

      const userData = {
        userId: response.data.user.id,
        username: response.data.user.username,
      };

      setUser(userData);
      setToken(response.data.token);

      return { success: true, message: response.data?.message };
    } catch (error) {
      let message = 'Ошибка подключения к сети';

      if (error.response) {
        message = error.response.data?.message || 'Ошибка при авторизации';
      }
      return { success: false, message };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await instance.post(`${AUTH_PATH}/register`, {
        username: username.trim(),
        password: password.trim(),
      });

      return { success: true, message: response.data?.message };
    } catch (err) {
      let message = 'Ошибка подключения к сети';

      if (err.response) {
        message = err.response.data?.message || 'Ошибка при регистрации';
      }
      return { success: false, message };
    }
  };

  // Выход из системы/аккаунта
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
