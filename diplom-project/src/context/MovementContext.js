import {
  React,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { instance } from 'services/api';
import {
  fetchCabinetInfo,
  fetchHistoryMovement,
  fetchRepairData,
} from 'services/movement';

const MovementContext = createContext();
export const useMovement = () => useContext(MovementContext);

function MovementProvider({ children }) {
  const [audience, setAudience] = useState(); // Описание аудиторий
  const [filteredAudience, setFilteredAudience] = useState(); // Отфильтрованный список аудиторий
  const [historyMovement, setHistoryMovement] = useState(); // История перемещений объектов
  const [isLoading, setIsLoading] = useState(false); // Статус загрузки

  // Список объектов по категориям, которые находятся в ремонте
  const [repairData, setRepairData] = useState({
    Все: [],
    Компьютер: [],
    Ноутбук: [],
    Монитор: [],
    МФУ: [],
    Камера: [],
    Мебель: [],
    'Система вентиляции': [],
  });

  // Обработчик получения информации об аудиториях
  const viewCabinetInfo = useCallback(async (signal) => {
    setIsLoading(true);
    try {
      const res = await fetchCabinetInfo({ signal });
      setAudience(res);
      setFilteredAudience(res.filter((cab) => cab?.description !== 'Склад')); // Фильтрация
      return { success: true, item: res };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', err);
        return {
          success: false,
          message: err.message || 'Ошибка при загрузке данных',
        };
      }
      return { success: false, aborted: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Получение сразу, поскольку он много где используется
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const loadInitialData = async () => {
      await viewCabinetInfo(signal);
    };

    loadInitialData();

    return () => abortController.abort();
  }, [viewCabinetInfo]);

  // Обработчик получения истории о перемещении объектов
  const updateHistoryMovement = useCallback(async (signal) => {
    setIsLoading(true);
    try {
      const res = await fetchHistoryMovement({ signal });
      setHistoryMovement(res);
      return { success: true, item: res };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', err);
        return {
          success: false,
          message: err.message || 'Ошибка при загрузке данных',
        };
      }
      return { success: false, aborted: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Обработчик получения информации о текущих объектах в ремонте
  const updateRepairData = useCallback(async (signal) => {
    setIsLoading(true);
    try {
      const data = await fetchRepairData({ signal });
      setRepairData(data);
      return { success: true, item: data };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', err);
        return {
          success: false,
          message: err.message || 'Ошибка при загрузке данных',
        };
      }
      return { success: false, aborted: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Валидация для возврата объекта обратно на склад
  const ReturnRepairedObject = useCallback(
    async (id, del, type) => {
      const endpoints = {
        Мебель: 'furniture_from_repair',
        'Система вентиляции': 'ventilation_from_repair',
        Компьютер: 'computer_from_repair',
        Ноутбук: 'laptop_from_repair',
        Монитор: 'screen_from_repair',
        МФУ: 'scanner_from_repair',
        Камера: 'camera_from_repair',
      };
      try {
        const response = await instance.patch(`/${endpoints[type]}/${id}`);
        if (response.status === 200) {
          await instance.delete(`/delete-repair/${del}`);
          await updateRepairData();

          return {
            success: true,
            message:
              response?.data?.message || 'Возврат объекта произошел успешно',
          };
        } else {
          return {
            success: false,
            message: 'Не удалось вернуть объект с ремонта',
          };
        }
      } catch (error) {
        console.error('Ошибка при возврате объекта:', error);
      }
    },
    [updateRepairData],
  );

  const contextValue = useMemo(
    () => ({
      audience,
      filteredAudience,
      repairData,
      historyMovement,
      isLoading,
      setAudience,
      viewCabinetInfo,
      updateHistoryMovement,
      updateRepairData,
      ReturnRepairedObject,
    }),
    [
      audience,
      filteredAudience,
      repairData,
      historyMovement,
      isLoading,
      viewCabinetInfo,
      updateHistoryMovement,
      updateRepairData,
      ReturnRepairedObject,
    ],
  );
  return (
    <MovementContext.Provider value={contextValue}>
      {children}
    </MovementContext.Provider>
  );
}

export default MovementProvider;
