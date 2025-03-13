import React, { useMemo } from 'react';
import { useSortBy, useTable, usePagination } from 'react-table';

const DataTable = ({ head, mockData }) => {
  const columns = useMemo(() => [...head], [head]);
  const data = useMemo(() => [...mockData], [mockData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Стандартное отображение начала для пагинации
    },
    useSortBy,
    usePagination,
  );
  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination__btn"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Предыдущая
        </button>
        <button
          className="pagination__btn"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Следующая
        </button>
        <span>
          Страница{' '}
          <strong>
            {pageIndex + 1} из {pageOptions.length}
          </strong>
        </span>
        <select
          className="pagination__select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((size) => (
            <option key={size} value={size}>
              Показывать {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DataTable;
