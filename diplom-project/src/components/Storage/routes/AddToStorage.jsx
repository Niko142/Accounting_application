import { React, useState } from 'react';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import { categories } from 'data/data';
import FurnitureSelection from '../forms/FurnitureSelection';
import VentilationSelection from '../forms/VentilationSelection';
import LaptopSelection from '../forms/LaptopSelection';
import ScreenSection from '../forms/ScreenSection';
import ScannerSelection from '../forms/ScannerSection';
import CameraSection from '../forms/CameraSection';
import ComputerSection from '../forms/ComputerSection';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export default function AddToStorage() {
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
          {/* Реализовать логику для импорта файла с данными помимо ручного ввода */}
          <Button isMove>
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
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => {
                return <option key={item.value}>{item.name}</option>;
              })}
            </select>
          </>
        )}
        {
          <>
            {category === 'Ноутбук' && <LaptopSelection />}
            {category === 'Компьютер' && <ComputerSection />}
            {category === 'Монитор' && <ScreenSection />}
            {category === 'МФУ' && <ScannerSelection />}
            {category === 'Камера' && <CameraSection />}
          </>
        }
        {type === 'furniture' && <FurnitureSelection />}
        {type === 'ventilation' && <VentilationSelection />}
      </TableContainer>
    </>
  );
}
