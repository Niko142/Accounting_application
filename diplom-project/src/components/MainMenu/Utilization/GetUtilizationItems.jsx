import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import { utilizationColumns } from 'data/columns';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { fetchUtilization } from 'services/mainMenu';
import ReturnButton from 'components/UI/ReturnButton';

export default function GetUtilizationItems() {
  // Можно потом вернуть фильтрацию
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetchUtilization(abortController);
        setData(res);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error('Ошибка при загрузке данных:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <TableContainer>
        {loading ? (
          <p>Загрузка ...</p>
        ) : (
          <>
            <ReturnButton />
            <DataTable head={utilizationColumns} mockData={data} />
          </>
        )}
      </TableContainer>
    </>
  );
}
