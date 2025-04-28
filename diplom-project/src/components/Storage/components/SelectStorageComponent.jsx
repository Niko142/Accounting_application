import React, { useMemo } from 'react';
import DataTable from 'components/Table/Table';

const SelectStorageComponent = ({ columns }) => {
  const memoizedColumns = useMemo(() => columns(), [columns]);
  // Исправить
  const memoizedData = useMemo(() => undefined || [], []);
  return <DataTable head={memoizedColumns} mockData={memoizedData} />;
};

export default SelectStorageComponent;
