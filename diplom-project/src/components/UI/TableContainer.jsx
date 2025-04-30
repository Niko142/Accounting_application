import { React } from 'react';

const TableContainer = ({ headerSizes, Lg, children }) => {
  return (
    <section className="table__wrapper">
      <div
        style={{ gridTemplateRows: `${headerSizes}` }}
        className={Lg ? 'table__container container-lg' : 'table__container'}
      >
        {children}
      </div>
    </section>
  );
};

export default TableContainer;
