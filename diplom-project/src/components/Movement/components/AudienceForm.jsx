import { React, useMemo } from 'react';
import { useMovement } from 'context/MovementContext';
import DataTable from 'components/Table/Table';
import { audienceColumns } from 'data/columns';

const AudienceForm = () => {
  const { audience, isLoading } = useMovement();

  const memoizedData = useMemo(() => audience || [], [audience]);

  return (
    <DataTable
      head={audienceColumns}
      mockData={memoizedData}
      size={8}
      disabledPagination
      isLoading={isLoading}
    />
  );
};
export default AudienceForm;
