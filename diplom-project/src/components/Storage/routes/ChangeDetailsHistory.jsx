import { React, useEffect, useState } from 'react';
import { fetchChangeDetailsHistory } from 'services/storage';
import { changeDetailsColumns } from 'data/columns';
import Header from 'components/Header/Header';
import DataTable from 'components/Table/Table';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';

export default function ChangeDetailsHistory() {
  const [detailsHistory, setDetailsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Обработчик получения данных
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      setIsLoading(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetchChangeDetailsHistory(abortController.signal);
        setDetailsHistory(res);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error('Ошибка при выполнении запроса', err.name);
          throw new Error('Ошибка при выполнении запроса:', err.name);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    return () => abortController.abort();
  }, []);

  return (
    <>
      <Header></Header>
      <TableContainer Xl>
        <div className="change__header">
          <h2>История замен:</h2>
          <ReturnButton />
        </div>
        <DataTable
          head={changeDetailsColumns}
          mockData={detailsHistory}
          isLoading={isLoading}
        />
      </TableContainer>
    </>
  );
}
