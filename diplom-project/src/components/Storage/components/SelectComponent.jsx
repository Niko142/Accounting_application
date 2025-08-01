import { React, useCallback, useEffect, useMemo } from 'react';
import { deleteComponentFromStorage } from 'services/storage';
import { useStorage } from 'context/StorageContext';
import DataTable from 'components/Table/Table';
import { toast } from 'react-toastify';

export default function SelectComponent({ componentType, columns }) {
  const { components, loadComponents, isLoading } = useStorage();

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
        console.log(id);
        const { success, message } = await deleteComponentFromStorage({
          component: componentType,
          id,
        });

        if (success) {
          await loadComponents(componentType);
          toast.success(message);
        } else {
          throw new Error(message);
        }
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
      <DataTable
        head={memoizedColumns}
        mockData={memoizedData}
        isLoading={isLoading}
      />
    </>
  );
}
