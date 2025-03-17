import {
  React,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  fetchEmployee,
  getPinningEmployee,
  addEmployee,
  deleteEmployee,
} from 'services/employee';
import { toast } from 'react-toastify';

const EmployeeContext = createContext();
export const useEmployee = () => useContext(EmployeeContext);

function EmployeeProvider({ children }) {
  const abortControllerRef = useRef(null);
  const [employees, setEmployees] = useState([]); // Список сотрудников
  const [pinning, setPinning] = useState([]); // Данные о закрепленном объекте за сотрудниками

  // Получение списка материально-ответственных лиц и истории закрепления
  const updateEmployees = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      // Для параллельной загрузки
      const [employeesData, pinningHistory] = await Promise.all([
        fetchEmployee({ signal }),
        getPinningEmployee({ signal }),
      ]);

      setEmployees(Array.isArray(employeesData) ? employeesData : []);
      setPinning(Array.isArray(pinningHistory) ? pinningHistory : []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', error);
        toast.error('Не удалось загрузить данные');
      }
    }
  }, []);

  // Функция для добавления нового сотрудника
  const handleAddEmployee = useCallback(
    async (newEmployee) => {
      try {
        await addEmployee(newEmployee);
        await updateEmployees();
        toast.success('Сотрудник успешно добавлен');
      } catch (error) {
        toast.error(error?.message || 'Ошибка при добавлении сотрудника');
      }
    },
    [updateEmployees],
  );

  // Функция для удаления сотрудника
  const handleDeleteEmployee = useCallback(
    async (id) => {
      try {
        await deleteEmployee(id);
        await updateEmployees();
        toast.success('Сотрудник успешно удален');
      } catch (error) {
        toast.error(error?.message || 'Ошибка при удалении сотрудника');
      }
    },
    [updateEmployees],
  );

  useEffect(() => {
    updateEmployees();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [updateEmployees]);

  const contextValue = useMemo(
    () => ({
      employees,
      pinning,
      updateEmployees,
      handleAddEmployee,
      handleDeleteEmployee,
    }),
    [
      employees,
      pinning,
      updateEmployees,
      handleAddEmployee,
      handleDeleteEmployee,
    ],
  );

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
