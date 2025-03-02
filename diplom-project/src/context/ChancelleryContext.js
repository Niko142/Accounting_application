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
import { toast } from 'react-toastify';
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

  const handleSelect = (id) => {
    selectChancellery(id, setCurrentGroup);
  };

  // Рендер списка категорий (работает при удалении, редактировании и добавлении)
  const updateProducts = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    try {
      await fetchData(abortControllerRef.current, setProducts);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteChancellery(id);
        await updateProducts();
        toast.success('Категория успешно удалена');
      } catch (error) {
        toast.error(error?.message || 'Ошибка при удалении категории');
      }
    },
    [updateProducts],
  );

  const handleAddGroup = useCallback(
    async (group) => {
      try {
        await addChancellery(group);
        await updateProducts();
        toast.success('Новая категория успешно добавлена');
      } catch (error) {
        toast.error(error?.message || 'Ошибка при добавлении товарной группы');
      }
    },
    [updateProducts],
  );

  // Функция для изменения количества товаров
  const handleAmountChange = useCallback(
    async (updatedGroup) => {
      try {
        await editAmounts(updatedGroup);
        await updateProducts();
        toast.success('Операция выполнена успешно');
      } catch (error) {
        toast.error(error.message || 'Ошибка при изменении количества товаров');
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
      handleSelect,
      handleAddGroup,
      handleAmountChange,
      handleDelete,
    }),
    [
      products,
      currentGroup,
      updateProducts,
      handleAddGroup,
      handleAmountChange,
      handleDelete,
    ],
  );

  return (
    <ChancelleryContext.Provider value={contextValue}>
      {children}
    </ChancelleryContext.Provider>
  );
}

export default ChancelleryProvider;

// import {
//   React,
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { toast } from 'react-toastify';
// import { editAmounts, fetchData } from 'services/chancellery';

// const ChancelleryContext = createContext();
// export const useChancellery = () => useContext(ChancelleryContext);

// function ChancelleryProvider({ children }) {
//   const abortControllerRef = useRef(null);
//   // получение данных с сервера
//   const [products, setProducts] = useState([]);

//   // Состояние при целевом редактировании элемента
//   const [currentGroup, setCurrentGroup] = useState({
//     name: '',
//     id: '',
//     amounts: '',
//   });

//   // Рендер списка категорий (работает при удалении, редактировании и добавлении)
//   const updateProducts = async () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     abortControllerRef.current = new AbortController();
//     try {
//       await fetchData(abortControllerRef.current, setProducts);
//     } catch (error) {
//       if (error.name !== 'AbortError') {
//         console.error('Ошибка при загрузке данных:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     updateProducts();
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   const contextValue = useMemo(
//     () => ({
//       products,
//       currentGroup,
//       setCurrentGroup,
//       updateProducts,
//     }),
//     [products, currentGroup],
//   );

//   return (
//     <ChancelleryContext.Provider value={contextValue}>
//       {children}
//     </ChancelleryContext.Provider>
//   );
// }

// export default ChancelleryProvider;
