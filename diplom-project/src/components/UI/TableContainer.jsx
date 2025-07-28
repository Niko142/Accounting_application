import { React } from 'react';

const TableContainer = ({ headerSizes, Lg, Xl, children }) => {
  return (
    <section className="table__wrapper">
      <div
        style={{ gridTemplateRows: `${headerSizes}` }}
        className={
          Xl
            ? 'table__container container-xl'
            : Lg
              ? 'table__container container-lg'
              : 'table__container'
        }
      >
        {children}
      </div>
    </section>
  );
};

export default TableContainer;
