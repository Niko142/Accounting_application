import { React, useEffect, useMemo } from 'react';
import { useMovement } from 'context/MovementContext';
import DataTable from 'components/Table/Table';
import { audienceColumns } from 'data/columns';

const AudienceForm = () => {
  const { audience, viewCabinetInfo } = useMovement();

  const memoizedData = useMemo(() => audience || [], [audience]);
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      try {
        await viewCabinetInfo(abortController.signal);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Запрос был отменен');
        }
      }
    };
    loadData();
    return () => abortController.abort();
  }, [viewCabinetInfo]);

  return (
    <DataTable
      head={audienceColumns}
      mockData={memoizedData}
      size={8}
      disabledPagination
    />
  );
};
export default AudienceForm;
