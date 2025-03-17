import { React, useState, useMemo, useCallback } from 'react';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import { ToastContainer } from 'react-toastify';
import { chancelleryColumns } from 'data/columns';
import DataTable from 'components/Table/Table';
import CustomModal from 'components/Modal/Modal';
import AddProductForm from './UI/AddProductForm';
import EditProductForm from './UI/EditProductForm';
import { useChancellery } from 'context/ChancelleryContext';

export default function Chancellery() {
  const {
    products,
    currentGroup,
    handleSelect,
    handleAmountChange,
    handleDelete,
    handleAddGroup,
  } = useChancellery();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const selectCategory = useCallback(
    (id) => {
      setOpenEditModal(true);
      handleSelect(id);
    },
    [handleSelect],
  );

  const memoizedColumns = useMemo(
    () => chancelleryColumns(selectCategory, handleDelete),
    [selectCategory, handleDelete],
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
        <AddProductForm
          onSubmit={(productData) => {
            handleAddGroup(productData);
            setOpenAddModal(false);
          }}
        />
      </CustomModal>
      <CustomModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title={'Изменение количества товаров'}
        onComplete={() => {
          handleAmountChange(currentGroup);
          setOpenEditModal(false);
        }}
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
          <DataTable head={memoizedColumns} mockData={memoizedData} />
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
