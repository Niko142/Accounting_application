import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { categories } from 'data/data';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';
import Button from 'components/Button/Button';
import AddFurnitureForm from '../forms/AddFurnitureForm';
import AddVentilationForm from '../forms/AddVentilationForm';
import AddLaptopForm from '../forms/AddLaptopForm';
import AddScreenForm from '../forms/AddScreenForm';
import AddScannerForm from '../forms/AddScannerForm';
import AddCameraForm from '../forms/AddCameraForm';
import AddComputerForm from '../forms/AddComputerForm';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AddToStorage() {
  const navivate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  return (
    <>
      <Header />
      <TypeSelection
        active={type}
        onChange={(type) => {
          setType(type);
          setCategory('');
        }}
      />
      <TableContainer Lg headerSizes={'75px 1fr'}>
        <div className="change__header">
          {/* Логика импорта excel-файла для добавления файлов */}
          <Button isMove onClick={() => navivate('/storage/import-file')}>
            Импорт <FontAwesomeIcon icon={faFileExcel} size="lg" />
          </Button>
          <ReturnButton />
        </div>
        {type === 'technic' && (
          <>
            <select
              className="main__input"
              style={{ marginBottom: '20px' }}
              value={category}
              defaultValue=""
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Выберите категорию ...
              </option>
              {categories.map((item) => {
                return <option key={item.value}>{item.label}</option>;
              })}
            </select>
          </>
        )}
        {
          <>
            {category === 'Ноутбук' && <AddLaptopForm />}
            {category === 'Компьютер' && <AddComputerForm />}
            {category === 'Монитор' && <AddScreenForm />}
            {category === 'МФУ' && <AddScannerForm />}
            {category === 'Камера' && <AddCameraForm />}
          </>
        }
        {type === 'furniture' && <AddFurnitureForm />}
        {type === 'ventilation' && <AddVentilationForm />}
        <Outlet />
      </TableContainer>
    </>
  );
}
