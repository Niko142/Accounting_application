import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from 'components/Table/Table';
import { fetchObjectData } from 'services/storage';

const SelectStorageComponent = ({ objectCategory, columns }) => {
  const [objectData, setObjectData] = useState([]);

  // Получение данных
  const updateObjectData = useCallback(
    async (signal) => {
      try {
        const res = await fetchObjectData({
          object: objectCategory,
          signal,
        });
        setObjectData(res);
      } catch (err) {
        console.log('Запрос отменен');
      }
    },
    [objectCategory],
  );

  useEffect(() => {
    const abortController = new AbortController();

    updateObjectData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [updateObjectData]);

  const memoizedColumns = useMemo(
    () => columns(updateObjectData),
    [columns, updateObjectData],
  );

  const memoizedData = useMemo(() => objectData || [], [objectData]);

  return <DataTable head={memoizedColumns} mockData={memoizedData} />;
};

export default SelectStorageComponent;
