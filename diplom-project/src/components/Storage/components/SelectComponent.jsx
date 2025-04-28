import { React, useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'components/Table/Table';
import {
  deleteComponentFromStorage,
  fetchComponentData,
} from 'services/storage';
import { toast, ToastContainer } from 'react-toastify';

export default function SelectComponent({ componentType, columns }) {
  const [componentData, setComponentData] = useState([]);

  // Получение данных о комплектующих и динамическое обновление при удалении
  const updateComponentData = useCallback(
    async (signal) => {
      try {
        const res = await fetchComponentData({
          component: componentType,
          signal,
        });
        setComponentData(res);
      } catch (err) {
        console.log('Запрос отменен');
      }
    },
    [componentType],
  );

  // Обработчик для удаления записи
  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteComponentFromStorage({ component: componentType, id });
        await updateComponentData();
        toast.success('Выбранное комплектующее удалено успешно!!!');
      } catch (err) {
        console.log('Ошибка при удалении компонента');
        toast.error(
          err.message || 'Не удалось удалить выбранное комплектующее',
        );
      }
    },
    [componentType, updateComponentData],
  );

  useEffect(() => {
    const abortController = new AbortController();

    updateComponentData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [updateComponentData]);

  const memoizedColumns = useMemo(
    () => columns(handleDelete),
    [columns, handleDelete],
  );
  const memoizedData = useMemo(() => componentData || [], [componentData]);

  return (
    <>
      <DataTable head={memoizedColumns} mockData={memoizedData} />
      <ToastContainer />
    </>
  );
}
