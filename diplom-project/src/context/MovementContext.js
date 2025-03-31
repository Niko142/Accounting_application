import {
  React,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { fetchCabinetInfo, fetchHistoryMovement } from 'services/movement';

const MovementContext = createContext();
export const useMovement = () => useContext(MovementContext);

function MovementProvider({ children }) {
  const [audience, setAudience] = useState();
  const [historyMovement, setHistoryMovement] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const viewCabinetInfo = useCallback(async (signal) => {
    setIsLoading(true);
    try {
      const res = await fetchCabinetInfo({ signal });
      setAudience(res);
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

  const contextValue = useMemo(
    () => ({
      audience,
      historyMovement,
      setAudience,
      viewCabinetInfo,
      updateHistoryMovement,
      isLoading,
    }),
    [
      audience,
      historyMovement,
      viewCabinetInfo,
      updateHistoryMovement,
      isLoading,
    ],
  );
  return (
    <MovementContext.Provider value={contextValue}>
      {children}
    </MovementContext.Provider>
  );
}

export default MovementProvider;
