import { React, useEffect, useState } from 'react';
import { utilizationColumns } from 'data/columns';
import { fetchUtilization } from 'services/mainMenu';
import Header from 'components/Header/Header';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import ReturnButton from 'components/UI/ReturnButton';

export default function GetUtilizationItems() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

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
        <ReturnButton />
        <DataTable
          head={utilizationColumns}
          mockData={data}
          isLoading={loading}
        />
      </TableContainer>
    </>
  );
}
