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
  const [products, setProducts] = useState([]); // Список канцелярии
  const [currentGroup, setCurrentGroup] = useState({
    name: '',
    id: '',
    amounts: '',
  }); // Выбранный объект из имеющегося кол-ва записей о канцелярии

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetchData(abortControllerRef.current);
      setProducts(Array.isArray(res) ? res : []);
    } catch (error) {
      if (error.name !== 'CanceledError') {
        console.error('Ошибка при загрузке данных:', error);
      }
      setProducts([]);
    } finally {
      setIsLoading(false);
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
        const response = await addChancellery(group);
        await updateProducts();
        return { success: true, message: response.message };
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
        const response = await editAmounts(updatedGroup);
        await updateProducts();
        return {
          success: true,
          message: response.message,
        };
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

  // Передача кэшированных значений
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
      isLoading,
    }),
    [
      products,
      currentGroup,
      updateProducts,
      selectCategory,
      addGroup,
      amountChange,
      deleteProducts,
      isLoading,
    ],
  );

  return (
    <ChancelleryContext.Provider value={contextValue}>
      {children}
    </ChancelleryContext.Provider>
  );
}

export default ChancelleryProvider;
