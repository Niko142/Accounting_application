import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from 'components/Table/Table';
import {
  fetchObjectData,
  repairObject,
  replaceDetailsComputer,
  utilizeObject,
} from 'services/storage';
import CustomModal from 'components/Modal/Modal';
import RepairForm from '../forms/RepairForm';
import UtilizationForm from '../forms/UtilizationForm';
import { toast, ToastContainer } from 'react-toastify';
import ChangeDetailsForm from '../forms/ChangeDetailsForm';
import { componentMap, COMPUTER_COMPONENTS_CONFIG } from '../config/config';

const SelectStorageComponent = ({ objectType, columns, idField }) => {
  const [objectData, setObjectData] = useState([]); // данные об объектах на складе
  const [modalType, setModalType] = useState(null); // разделение логики модалок в зависимости от задачи
  const [selectedObject, setSelectedObject] = useState(null); // выбранный объект

  // Часть логики можно будет отправить в отдельный блок

  // Получение и обновление данных об объектах на складе
  const updateObjectData = useCallback(
    async (signal) => {
      try {
        const res = await fetchObjectData({
          object: objectType,
          signal,
        });
        setObjectData(res);
      } catch (err) {
        console.log('Запрос отменен');
      }
    },
    [objectType],
  );

  // Обработчик для закрытия модальных окон
  const closeModal = () => {
    setModalType(null);
    setSelectedObject(null);
  };

  // Обработка выбранного объекта и конкретизация модальных окон по их назначению
  const prepareObjectAction = useCallback(
    (id, action) => {
      const item = objectData.find((obj) => obj[idField] === id);
      setSelectedObject(item);
      setModalType(action);
    },
    [objectData, idField],
  );

  // Обработчик открытия модального окна "ремонт"
  const handleRepair = useCallback(
    (id) => {
      prepareObjectAction(id, 'repair');
    },
    [prepareObjectAction],
  );

  // Обработчик открытия модального окна "утилизация"
  const handleDelete = useCallback(
    (id) => {
      prepareObjectAction(id, 'delete');
    },
    [prepareObjectAction],
  );

  // Обработчик открытия модального окна "Замена" (только для компьютеров)
  const handleChange = useCallback(
    (id) => {
      prepareObjectAction(id, 'change');
    },
    [prepareObjectAction],
  );

  useEffect(() => {
    const abortController = new AbortController();

    updateObjectData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [updateObjectData]);

  // Попробовать все данные обработать через Map

  // Вывод объекта в зависимости от столбцов в БД
  const getObjectName = (object) => {
    if (!object) return '';
    switch (objectType) {
      case 'furniture':
        return `${object.name} ${object.model}`;
      case 'computer':
        return object.name;
      case 'scanner':
        return object.nam;
      default:
        return object.model;
    }
  };
  const objectName = getObjectName(selectedObject);

  // Определение категории объекта в зависимости от его типа
  const getObjectCategory = (type) => {
    switch (type) {
      case 'furniture':
        return 'Мебель';
      case 'ventilation':
        return 'Система вентиляции';
      default:
        return 'Оргтехника';
    }
  };
  const objectCategory = getObjectCategory(objectType);

  // Конвертирование типа для записи в БД и возможности возврата объекта
  const categoryMap = {
    computer: 'Компьютер',
    laptop: 'Ноутбук',
    screen: 'Монитор',
    scanner: 'МФУ',
    camera: 'Камера',
    furniture: 'Мебель',
    ventilation: 'Система вентиляции',
  };
  const objectMapType = categoryMap[objectType] ?? 'Неизвестно';

  const memoizedColumns = useMemo(
    () =>
      columns({
        onChange: handleChange,
        onRepair: handleRepair,
        onDelete: handleDelete,
      }),
    [columns, handleRepair, handleDelete, handleChange],
  );
  const memoizedData = useMemo(() => objectData || [], [objectData]);

  return (
    <>
      <CustomModal
        isOpen={modalType === 'repair'}
        onClose={closeModal}
        title={'Отправка объекта в ремонт'}
      >
        <RepairForm
          onSubmit={async (formData) => {
            const response = await repairObject({
              ...formData,
              category: objectCategory,
              type: objectMapType,
              model: objectName,
              number: selectedObject?.[idField],
              object: objectType,
            });

            if (response.success) {
              await updateObjectData();
              toast.success('Объект успешно отправлен в ремонт');
              closeModal();
            } else {
              toast.error(
                response.message || 'Ошибка при отправке объекта в ремонт',
              );
            }
          }}
          objectName={objectName}
        />
      </CustomModal>
      <CustomModal
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        title={'Утилизация объекта'}
      >
        <UtilizationForm
          onSubmit={async (formData) => {
            const response = await utilizeObject({
              ...formData,
              category: objectCategory,
              type: objectMapType,
              number: selectedObject?.[idField],
              model: objectName,
              object: objectType,
            });

            if (response.success) {
              await updateObjectData();
              toast.success('Объект успешно утилизирован');
              closeModal();
            } else {
              toast.error(response.message || 'Ошибка при утилизации объекта');
            }
          }}
          objectName={objectName}
        />
      </CustomModal>
      <CustomModal
        isOpen={modalType === 'change'}
        onClose={closeModal}
        title={'Замена комплектующих'}
      >
        <ChangeDetailsForm
          /*
           * Тестовый запросник
           */
          // onSubmit={async (formData) => {
          //   const config = COMPUTER_COMPONENTS_CONFIG[formData.category];
          //   // const componentKey = componentMap[config.componentKey];

          //   console.log(selectedObject);
          //   // console.log(selectedObject?.[componentKey]);
          //   console.log(+selectedObject?.[config.id]);
          //   console.log(formData);
          //   closeModal();
          // }}

          onSubmit={async (formData) => {
            const config = COMPUTER_COMPONENTS_CONFIG[formData.category];
            const componentKey = componentMap[config.componentKey];

            const selectedComponentId =
              formData.selectedComponent.split(',')[0];
            const selectedComponentName =
              formData.selectedComponent.split(',')[1];

            const response = await replaceDetailsComputer({
              name: objectName,
              type: formData.category,
              start: selectedObject?.[componentKey],
              end: selectedComponentName,
              date: formData.date,
              computerId: selectedObject?.[idField],
              oldComponentId: selectedObject?.[config.id],
              newComponentId: selectedComponentId,
              config,
            });

            if (response.success) {
              await updateObjectData();
              toast.success('Успешная замена комплектующего');
              closeModal();
            } else {
              toast.error(
                response.message || 'Ошибка при замене комплектующего',
              );
            }
          }}
          selectedObject={selectedObject}
          computerName={objectName}
        />
      </CustomModal>

      <DataTable head={memoizedColumns} mockData={memoizedData} />
      <ToastContainer />
    </>
  );
};

export default SelectStorageComponent;
