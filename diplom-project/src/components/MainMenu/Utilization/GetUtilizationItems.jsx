import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import { utilizationColumns } from 'data/columns';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';
import { fetchUtilization } from 'services/mainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function GetUtilizationItems() {
  // Можно потом вернуть фильтрацию
  const navigate = useNavigate('');
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
        if (err.name !== 'AbortError') {
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
            <FontAwesomeIcon
              className="navigate-back"
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
            />
            <DataTable head={utilizationColumns} mockData={data} />
          </>
        )}
      </TableContainer>
    </>
  );
}
