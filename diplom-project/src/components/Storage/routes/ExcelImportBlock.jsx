import Header from 'components/Header/Header';
import React from 'react';
import ExcelParser from '../components/ExcelParser';
import TableContainer from 'components/UI/TableContainer';

const ExcelImportBlock = () => {
  return (
    <>
      <Header></Header>
      <TableContainer>
        <ExcelParser />
      </TableContainer>
    </>
  );
};

export default ExcelImportBlock;
