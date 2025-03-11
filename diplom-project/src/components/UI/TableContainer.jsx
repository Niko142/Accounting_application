import { React } from 'react';

const TableContainer = ({ children }) => {
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="table__container">{children}</div>
    </section>
  );
};

export default TableContainer;
