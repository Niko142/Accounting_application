import { React, useCallback, useEffect, useMemo } from 'react';
import DataTable from 'components/Table/Table';
import { ToastContainer, toast } from 'react-toastify';
import { deleteComponentFromStorage } from 'services/storage';
import { useStorage } from 'context/StorageContext';

export default function SelectComponent({ componentType, columns }) {
  const { components, loadComponents } = useStorage();

  // Получение данных о комплектующих
  useEffect(() => {
    const abortController = new AbortController();
    loadComponents(componentType, abortController.signal);

    return () => abortController.abort();
  }, [componentType, loadComponents]);

  // Удаление данных и их динамическое обновление
  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteComponentFromStorage({ component: componentType, id });
        await loadComponents(componentType);
        toast.success('Выбранное комплектующее удалено успешно!!!');
      } catch (err) {
        toast.error(
          err.message || 'Не удалось удалить выбранное комплектующее',
        );
      }
    },
    [componentType, loadComponents],
  );

  const memoizedColumns = useMemo(
    () => columns(handleDelete),
    [columns, handleDelete],
  );
  const memoizedData = useMemo(
    () => components[componentType] || [],
    [components, componentType],
  );

  return (
    <>
      <DataTable head={memoizedColumns} mockData={memoizedData} />
      <ToastContainer />
    </>
  );
}
