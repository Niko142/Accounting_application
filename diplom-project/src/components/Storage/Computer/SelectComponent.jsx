import { React, useCallback, useEffect, useMemo, useState } from 'react';
import { instance } from 'services/api';
import DataTable from 'components/Table/Table';

export default function SelectComponent({ componentType, columns }) {
  const [componentData, setComponentData] = useState([]);

  const handleDelete = useCallback(
    (id) => {
      instance.delete(`/delete-${componentType}/${id}`);
    },
    [componentType],
  );

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        const result = await instance.get(`/${componentType}`, {
          signal: abortController.signal,
        });
        setComponentData(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Ошибка при обработке запроса: ', err);
        }
      }
    };

    loadData();

    return () => {
      abortController.abort();
    };
  }, [componentType]);

  const memoizedColumns = useMemo(
    () => columns(handleDelete),
    [columns, handleDelete],
  );
  const memoizedData = useMemo(() => componentData || [], [componentData]);

  return <DataTable head={memoizedColumns} mockData={memoizedData} />;
}
