import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import DataTable from 'components/Table/Table';
import { changeDetailsColumns } from 'data/columns';
import TableContainer from 'components/UI/TableContainer';
import { fetchChangeDetailsHistory } from 'services/storage';
import ReturnButton from 'components/UI/ReturnButton';

export default function ChangeDetailsHistory() {
  const [detailsHistory, setDetailsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик получения даты
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      setIsLoading(true);
      try {
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
      <TableContainer>
        <div className="change__header">
          <h2>История замен:</h2>
          <ReturnButton />
        </div>
        {isLoading ? (
          <p>Загрузка ...</p>
        ) : (
          <DataTable head={changeDetailsColumns} mockData={detailsHistory} />
        )}
      </TableContainer>
    </>
  );
}
