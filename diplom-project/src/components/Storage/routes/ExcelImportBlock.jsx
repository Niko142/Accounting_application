import Header from 'components/Header/Header';
import React from 'react';
import ExcelParser from '../components/ExcelParser';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';

const ExcelImportBlock = () => {
  return (
    <>
      <Header />
      <TableContainer>
        <ReturnButton stretch />
        <ExcelParser />
      </TableContainer>
    </>
  );
};

export default ExcelImportBlock;
