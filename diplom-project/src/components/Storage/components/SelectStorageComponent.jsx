import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from 'components/Table/Table';
import { fetchObjectData } from 'services/storage';
import CustomModal from 'components/Modal/Modal';

const SelectStorageComponent = ({ objectCategory, columns, idField }) => {
  const [objectData, setObjectData] = useState([]); // данные об объектах на складе
  const [modalType, setModalType] = useState(null); // разделение логики модалок в зависимости от задачи
  const [selectedObject, setSelectedObject] = useState(null); // выбранный объект

  // Получение и обновление данных об объектах на складе
  const updateObjectData = useCallback(
    async (signal) => {
      try {
        const res = await fetchObjectData({
          object: objectCategory,
          signal,
        });
        setObjectData(res);
      } catch (err) {
        console.log('Запрос отменен');
      }
    },
    [objectCategory],
  );

  // Закрытие модального окна
  const closeModal = () => {
    setModalType(null);
    setSelectedObject(null);
  };

  // Обработчик открытия модального окна "ремонт"
  const handleRepair = useCallback(
    (id) => {
      const item = objectData.find((obj) => obj[idField] === id);
      setSelectedObject(item);
      setModalType('repair');
    },
    [objectData, idField],
  );

  // Обработчик открытия модального окна "утилизация"
  const handleDelete = useCallback(
    (id) => {
      const item = objectData.find((obj) => obj[idField] === id);
      setSelectedObject(item);
      setModalType('delete');
    },
    [objectData, idField],
  );

  useEffect(() => {
    const abortController = new AbortController();

    updateObjectData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [updateObjectData]);

  const memoizedColumns = useMemo(
    () => columns(handleRepair, handleDelete),
    [columns, handleRepair, handleDelete],
  );

  const memoizedData = useMemo(() => objectData || [], [objectData]);

  return (
    <>
      <CustomModal
        isOpen={modalType === 'repair'}
        onClose={closeModal}
        title={'Отправка объекта в ремонт'}
        onComplete={() => {
          console.log('Ремонт:', selectedObject);
          // updateObjectData();
          closeModal();
        }}
      >
        <p>
          Выбранный объект:{' '}
          <strong>
            {selectedObject?.name ||
              selectedObject?.model ||
              selectedObject?.nam}
          </strong>
        </p>
      </CustomModal>
      <CustomModal
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        title={'Утилизация объекта'}
        onComplete={() => {
          console.log('Удалено:', selectedObject);
          // updateObjectData();
          closeModal();
        }}
      >
        <p>
          Выбранный объект: <strong>{selectedObject?.nam}</strong>
        </p>
      </CustomModal>

      <DataTable head={memoizedColumns} mockData={memoizedData} />
    </>
  );
};

export default SelectStorageComponent;

// Axios.post('http://localhost:3001/utilization', {
//         date: date,
//         category: 'Оргтехника',
//         type: 'Ноутбук',
//         number: now.id,
//         model: now.name,
//         reason: reason,

// Axios.post('http://localhost:3001/repair', {
//   date: startDate,
//   category: 'Оргтехника',
//   type: 'Ноутбук',
//   model: now.name,
//   number: now.id,
//   end: endDate,
//   description: desc,
