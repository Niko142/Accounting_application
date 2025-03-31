import { React, useEffect, useMemo } from 'react';
import Header from 'components/Header/Header';
import DataTable from 'components/Table/Table';
import { useNavigate } from 'react-router-dom';
import { historyColumns } from 'data/columns';
import { useMovement } from 'context/MovementContext';
import TableContainer from 'components/UI/TableContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export default function HistoryMovement() {
  const { isLoading, historyMovement, updateHistoryMovement } = useMovement();
  const navigate = useNavigate();

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
          <FontAwesomeIcon
            className="navigate-back"
            icon={faArrowLeft}
            onClick={() => navigate(-1)}
          />
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
