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
  //Сохранение авторизованного пользователя при перезагрузке
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const response = await instance.post('/login', {
        username: username.trim(),
        password: password.trim(),
      });

      if (response.data.message === 'Успешная авторизация') {
        const userData = {
          username,
          userId: response.data.userId,
        };
        setUser(userData);
        return { success: true, message: 'Успешная авторизация' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      return { success: false, message: 'Ошибка сервера. Попробуйте позже.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
