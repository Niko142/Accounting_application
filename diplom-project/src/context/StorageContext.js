import {
  React,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { fetchComponentData } from 'services/storage';

const StorageContext = createContext();
export const useStorage = () => useContext(StorageContext);

function StorageProvider({ children }) {
  const [components, setComponents] = useState({}); // Данные о компонентах
  const [isLoading, setIsLoading] = useState(false);

  // Получение данных
  const loadComponents = useCallback(async (componentType, signal) => {
    setIsLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await fetchComponentData({
        component: componentType,
        signal,
      });
      setComponents((prev) => ({ ...prev, [componentType]: data }));
    } catch (error) {
      if (error.name !== 'CanceledError') {
        console.error('Ошибка при загрузке данных', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      components,
      loadComponents,
      isLoading,
    }),
    [components, loadComponents, isLoading],
  );

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
}

export default StorageProvider;
