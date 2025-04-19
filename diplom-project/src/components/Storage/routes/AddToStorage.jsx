import { React, useState } from 'react';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import { categories } from 'data/data';
import FurnitureSelection from '../FurnitureSelection';
import VentilationSelection from '../VentilationSelection';
import LaptopSelection from '../LaptopSelection';
import ScreenSection from '../ScreenSection';
import ScannerSelection from '../ScannerSection';
import CameraSection from '../CameraSection';
import ComputerSection from '../Computer/ComputerSection';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';

export default function AddToStorage() {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  return (
    <>
      <Header />
      <div>
        <TypeSelection
          active={type}
          onChange={(type) => {
            setType(type);
            setCategory('');
          }}
        />
      </div>
      <TableContainer>
        <div className="change__header">
          <h2>Выберите категорию, в которую добавляется объект:</h2>
          <ReturnButton />
        </div>
        {type === 'technic' && (
          <>
            <select
              className="main__input"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">. . .</option>
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
