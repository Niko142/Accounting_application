import {
  React,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { fetchEmployee, getPinningEmployee } from 'services/employee';
import { toast } from 'react-toastify';

const EmployeeContext = createContext();
export const useEmployee = () => useContext(EmployeeContext);

function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState([]); // Список сотрудников
  const [pinning, setPinning] = useState([]); // Данные о закрепленном объекте за сотрудниками

  // Получение списка материально-ответственных лиц
  const fetchEmployees = useCallback(async (controller) => {
    try {
      const data = await fetchEmployee(controller);
      setEmployee(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при загрузке списка сотрудников:', err);
      }
    }
  }, []);

  // Получение истории закрепления объектов за сотрудниками
  const pinningHistory = useCallback(async (controller) => {
    try {
      const data = await getPinningEmployee(controller);
      setPinning(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Ошибка при загрузке истории закрепления:', err);
      }
    }
  }, []);

  const addEmployee = useCallback(async () => {
    try {
      await fetchEmployees();
    } catch (err) {
      toast.error(err?.message || 'Ошибка при добавлении нового сотрудника');
    }
  }, [fetchEmployees]);

  useEffect(() => {
    const employeeController = new AbortController();
    const pinningController = new AbortController();

    fetchEmployees(employeeController);
    pinningHistory(pinningController);

    return () => {
      employeeController.abort();
      pinningController.abort();
    };
  }, [fetchEmployees, pinningHistory]);

  const contextValue = useMemo(
    () => ({
      employee,
      pinning,
      fetchEmployees,
      pinningHistory,
      addEmployee,
    }),
    [employee, pinning, fetchEmployees, pinningHistory, addEmployee],
  );

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
