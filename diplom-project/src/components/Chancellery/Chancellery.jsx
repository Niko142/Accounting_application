import { React, useState } from 'react';
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

  const [product, setProduct] = useState({
    type: '...',
    name: '',
    unit: '',
    price: '',
    amounts: '',
  });

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const selectCategory = (id) => {
    setOpenEditModal(true);
    handleSelect(id);
  };

  return (
    <>
      <Header />
      <CustomModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title={'Добавление новой товарной группы'}
        onComplete={() => {
          handleAddGroup({
            type: product.type,
            name: product.name,
            unit: product.unit,
            price: +product.price,
            amounts: +product.amounts,
          });
          setOpenAddModal(false);
        }}
      >
        <AddProductForm state={product} setState={setProduct} />
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
          <DataTable
            head={chancelleryColumns(selectCategory, handleDelete)}
            mockData={products}
          />
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
