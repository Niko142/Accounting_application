import DataTable from 'react-data-table-component';
import { React } from 'react';

const MainTable = ({ column, data }) => {
  return (
    <DataTable
      columns={column}
      data={data}
      pagination
      fixedHeader
      highlightOnHover
    />
  );
};

export default MainTable;
