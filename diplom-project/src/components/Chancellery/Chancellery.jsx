import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import {
  fetchData,
  selectChancellery,
  deleteChancellery,
  addChancellery,
  editAmounts,
} from 'services/chancellery';
import { chancelleryColumns } from 'data/columns';
import DataTable from 'components/Table/Table';
import CustomModal from 'components/Modal/Modal';
import AddProductForm from './UI/AddProductForm';
import EditProductForm from './UI/EditProductForm';

// Убрать потом window.reload

export default function OfficeMenu() {
  const [product, setProduct] = useState({
    type: '...',
    name: '',
    unit: '',
    price: '',
    amounts: '',
  });
  const [currentGroup, setCurrentGroup] = useState({
    name: '',
    id: '',
    amounts: '',
  });

  const [result, setResult] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController, setResult);
    return () => abortController.abort();
  }, []);

  const handleSelect = (id) => {
    setOpenEditModal(true);
    selectChancellery(id, setCurrentGroup);
  };

  const handleDelete = (id) => {
    deleteChancellery(id);
  };

  const handleAddGroup = () => {
    addChancellery(
      {
        type: product.type,
        name: product.name,
        unit: product.unit,
        price: +product.price,
        amounts: +product.amounts,
      },
      toast,
    );
  };

  const handleAmountChange = (updatedGroup) => {
    setCurrentGroup(updatedGroup); // Обновление состояния currentGroup
  };

  return (
    <>
      <Header />
      <CustomModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title={'Добавление новой товарной группы'}
        onComplete={handleAddGroup}
      >
        <AddProductForm state={product} setState={setProduct} />
        <ToastContainer />
      </CustomModal>
      <CustomModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title={'Изменение количества товаров'}
        onComplete={() => editAmounts(currentGroup, toast)}
      >
        <EditProductForm state={currentGroup} onChange={handleAmountChange} />
        <ToastContainer />
      </CustomModal>
      <section className="chancellery">
        <div className="chancellery__block">
          <div className="chancellery__header">
            <Button isActive onClick={() => setOpenAddModal(true)}>
              Добавить категорию
            </Button>
          </div>
          <DataTable
            head={chancelleryColumns(handleSelect, handleDelete)}
            mockData={result}
          />
        </div>
      </section>
    </>
  );
}
