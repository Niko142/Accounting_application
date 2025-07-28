import { React, useCallback, useMemo } from 'react';
import { useMovement } from 'context/MovementContext';
import { repairColumns } from 'data/columns';
import DataTable from 'components/Table/Table';
import { toast } from 'react-toastify';

export default function RepairTable({ repair }) {
  const { ReturnRepairedObject, isLoading } = useMovement();

  const handleReturn = useCallback(
    async (id, del, type) => {
      const result = await ReturnRepairedObject(id, del, type);

      if (result?.success) {
        toast.success(result.message || 'Операция выполнена успешно!');
      } else {
        toast.error(result?.message || 'Ошибка при выполнении операции.');
      }
    },
    [ReturnRepairedObject],
  );

  const memoizedColumns = useMemo(
    () => repairColumns(handleReturn),
    [handleReturn],
  );

  const memoizedData = useMemo(() => repair || [], [repair]);

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
