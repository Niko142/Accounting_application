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
  const [components, setComponents] = useState({});

  // Получение данных
  const loadComponents = useCallback(async (componentType, signal) => {
    try {
      const data = await fetchComponentData({
        component: componentType,
        signal,
      });
      setComponents((prev) => ({ ...prev, [componentType]: data }));
    } catch (error) {
      if (error.name !== 'CanceledError') {
        console.error('Ошибка при загрузке данных', error);
      }
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      components,
      loadComponents,
    }),
    [components, loadComponents],
  );

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
}

export default StorageProvider;
