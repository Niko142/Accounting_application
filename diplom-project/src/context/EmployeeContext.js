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

const EmployeeContext = createContext();
export const useEmployee = () => useContext(EmployeeContext);

function EmployeeProvider({ children }) {
  const abortControllerRef = useRef(null);
  const [employees, setEmployees] = useState([]); // Список сотрудников
  const [pinning, setPinning] = useState([]); // Данные о закрепленном объекте за сотрудниками

  const [isLoading, setIsLoading] = useState(false);

  // Получение списка материально-ответственных лиц и истории закрепления
  const updateEmployees = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setIsLoading(true);
    try {
      // Для параллельной загрузки
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const [employeesData, pinningHistory] = await Promise.all([
        fetchEmployee({ signal }),
        getPinningEmployee({ signal }),
      ]);

      setEmployees(Array.isArray(employeesData) ? employeesData : []);
      setPinning(Array.isArray(pinningHistory) ? pinningHistory : []);
      return { success: true, item: [employeesData, pinningHistory] };
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', error);
        return { success: false, message: error.message };
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Функция для добавления нового сотрудника
  const addNewEmployee = useCallback(
    async (newEmployee) => {
      try {
        await addEmployee(newEmployee);
        await updateEmployees();
        return { success: true, message: 'Сотрудник успешно добавлен' };
      } catch (error) {
        console.log('Ошибка при добавлении сотрудника');
        return { success: false, message: error.message };
      }
    },
    [updateEmployees],
  );

  // Функция для удаления сотрудника
  const deleteSelectEmployee = useCallback(
    async (id) => {
      try {
        const res = await deleteEmployee(id);
        await updateEmployees();
        return {
          success: true,
          message: res.message || 'Сотрудник успешно удален',
        };
      } catch (error) {
        return { success: false, message: error.message };
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
      addNewEmployee,
      deleteSelectEmployee,
      isLoading,
    }),
    [
      employees,
      pinning,
      updateEmployees,
      addNewEmployee,
      deleteSelectEmployee,
      isLoading,
    ],
  );

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeProvider;
