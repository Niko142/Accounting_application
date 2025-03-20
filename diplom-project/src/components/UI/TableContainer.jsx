import { React } from 'react';

const TableContainer = ({ Lg, children }) => {
  return (
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className={Lg ? 'table__container container-lg' : 'table__container'}
      >
        {children}
      </div>
    </section>
  );
};

export default TableContainer;
