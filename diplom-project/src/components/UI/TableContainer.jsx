import { React } from 'react';

const TableContainer = ({ Lg, children }) => {
  return (
    <section className="table__wrapper">
      <div
        className={Lg ? 'table__container container-lg' : 'table__container'}
      >
        {children}
      </div>
    </section>
  );
};

export default TableContainer;
