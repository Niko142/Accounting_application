import { React, useState } from 'react';
import Header from 'components/Header/Header';
import ComponentsSelection from '../Computer/ComponentsSelection';
import SelectVideocard from '../Computer/SelectVideocard';
import SelectProcessor from '../Computer/SelectProcessor';
import SelectMothercard from '../Computer/SelectMothercard';
import SelectMemory from '../Computer/SelectMemory';
import SelectDisk from '../Computer/SelectDisk';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';

export default function ComponentsMenu() {
  const [type, setType] = useState('');
  return (
    <>
      <Header />
      <ComponentsSelection active={type} onChange={(type) => setType(type)} />
      <TableContainer>
        <ReturnButton />
        {type === 'videocard' && <SelectVideocard />}
        {type === 'processor' && <SelectProcessor />}
        {type === 'mothercard' && <SelectMothercard />}
        {type === 'memory' && <SelectMemory />}
        {type === 'disk' && <SelectDisk />}
      </TableContainer>
    </>
  );
}
