import { React, useEffect, useMemo } from 'react';
import Header from 'components/Header/Header';
import DataTable from 'components/Table/Table';
import { historyColumns } from 'data/columns';
import { useMovement } from 'context/MovementContext';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';
export default function HistoryMovement() {
  const { isLoading, historyMovement, updateHistoryMovement } = useMovement();

  const memoizedData = useMemo(() => historyMovement || [], [historyMovement]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        await updateHistoryMovement(abortController.signal);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Запрос был отменен');
        }
      }
    };

    loadData();

    return () => abortController.abort();
  }, [updateHistoryMovement]);

  return (
    <>
      <Header></Header>
      <TableContainer>
        <div className="history__header">
          <h2>История перемещения объектов:</h2>
          <ReturnButton />
        </div>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <DataTable head={historyColumns} mockData={memoizedData} />
        )}
      </TableContainer>
    </>
  );
}
