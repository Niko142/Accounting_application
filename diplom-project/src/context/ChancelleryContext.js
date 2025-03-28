import {
  React,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  addChancellery,
  deleteChancellery,
  editAmounts,
  fetchData,
  selectChancellery,
} from 'services/chancellery';

const ChancelleryContext = createContext();
export const useChancellery = () => useContext(ChancelleryContext);

function ChancelleryProvider({ children }) {
  const abortControllerRef = useRef(null);
  // Получаем значения от сервера
  const [products, setProducts] = useState([]);
  // Состояние при целевом редактировании элемента
  const [currentGroup, setCurrentGroup] = useState({
    name: '',
    id: '',
    amounts: '',
  });

  const selectCategory = useCallback(async (id) => {
    try {
      const selectedItem = await selectChancellery(id);
      setCurrentGroup(selectedItem || null);
      return { success: true, item: selectedItem };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, []);

  // Рендер списка категорий (работает при удалении, редактировании и добавлении)
  const updateProducts = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    try {
      const res = await fetchData(abortControllerRef.current);
      setProducts(Array.isArray(res) ? res : []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', error);
      }
      setProducts([]);
    }
  }, []);

  const deleteProducts = useCallback(
    async (id) => {
      try {
        await deleteChancellery(id);
        await updateProducts();
        return { success: true, message: 'Категория успешно удалена' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    [updateProducts],
  );

  const addGroup = useCallback(
    async (group) => {
      try {
        await addChancellery(group);
        await updateProducts();
        return { success: true, message: 'Новая категория успешно добавлена' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    [updateProducts],
  );

  // Функция для изменения количества товаров
  const amountChange = useCallback(
    async (updatedGroup) => {
      try {
        await editAmounts(updatedGroup);
        await updateProducts();
        return { success: true, message: 'Операция выполнена успешно' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },
    [updateProducts],
  );

  useEffect(() => {
    updateProducts();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [updateProducts]);

  // Передача мемоизированных значений
  const contextValue = useMemo(
    () => ({
      products,
      currentGroup,
      setCurrentGroup,
      updateProducts,
      selectCategory,
      addGroup,
      amountChange,
      deleteProducts,
    }),
    [
      products,
      currentGroup,
      updateProducts,
      selectCategory,
      addGroup,
      amountChange,
      deleteProducts,
    ],
  );

  return (
    <ChancelleryContext.Provider value={contextValue}>
      {children}
    </ChancelleryContext.Provider>
  );
}

export default ChancelleryProvider;
