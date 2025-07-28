import { React, useState, useMemo, useCallback } from 'react';
import { useChancellery } from 'context/ChancelleryContext';
import { chancelleryColumns } from 'data/columns';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import DataTable from 'components/Table/Table';
import CustomModal from 'components/Modal/Modal';
import AddProductForm from './UI/AddProductForm';
import EditProductForm from './UI/EditProductForm';
import { toast } from 'react-toastify';

export default function Chancellery() {
  const {
    products,
    currentGroup,
    selectCategory,
    amountChange,
    deleteProducts,
    addGroup,
    isLoading,
  } = useChancellery();

  // Управление открытием/закрытием модальных окон
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Обработчик нажатия кнопки для добавления категории
  const handleSelect = useCallback(
    async (id) => {
      try {
        setOpenEditModal(true);
        await selectCategory(id);
      } catch (err) {
        toast.error(err.message || 'Ошибка при выборе категории');
      }
    },
    [selectCategory],
  );

  // Обработчик добавления категории
  const handleAddGroup = useCallback(
    async (productData) => {
      try {
        const result = await addGroup(productData);
        if (result.success) {
          toast.success(result.message);
          setOpenAddModal(false);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error.message || 'Ошибка при добавлении группы');
      }
    },
    [addGroup],
  );

  // Обработчик удаления категории
  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteProducts(id);
        toast.success('Категория успешно удалена');
      } catch (error) {
        toast.error(error.message || 'Ошибка при удалении категории');
      }
    },
    [deleteProducts],
  );

  // Обработчик изменения количества товаров
  const handleAmountChange = useCallback(async () => {
    try {
      const res = await amountChange(currentGroup);
      toast.success(res.message || 'Количество успешно изменено');
      setOpenEditModal(false);
    } catch (error) {
      toast.error(error.message || 'Ошибка при изменении количества');
    }
  }, [amountChange, currentGroup]);

  const memoizedColumns = useMemo(
    () => chancelleryColumns(handleSelect, handleDelete),
    [handleSelect, handleDelete],
  );

  const memoizedData = useMemo(() => products || [], [products]);

  return (
    <>
      <Header />
      <CustomModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title={'Добавление новой товарной группы'}
      >
        <AddProductForm onSubmit={handleAddGroup} />
      </CustomModal>
      <CustomModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title={'Изменение количества товаров'}
        onComplete={handleAmountChange}
      >
        <EditProductForm />
      </CustomModal>
      <section className="chancellery">
        <div className="chancellery__block">
          <div className="chancellery__header">
            <Button isActive onClick={() => setOpenAddModal(true)}>
              Добавить категорию
            </Button>
          </div>
          <DataTable
            head={memoizedColumns}
            mockData={memoizedData}
            isLoading={isLoading}
          />
        </div>
      </section>
    </>
  );
}
