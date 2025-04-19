import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import { categories } from 'data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';

import SelectFurniture from './SelectStorage/SelectFurniture';
import SelectVentilation from './SelectStorage/SelectVentilation';
import SelectComputer from './SelectStorage/SelectComputer';
import SelectLaptop from './SelectStorage/SelectLaptop';
import SelectScreen from './SelectStorage/SelectScreen';
import SelectScanner from './SelectStorage/SelectScanner';
import SelectCamera from './SelectStorage/SelectCamera';

export default function Storage() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => navigate('/storage/add-objects')}>
          Пополнение на склад
        </Button>
        <Button isActive onClick={() => navigate('/storage/components')}>
          <FontAwesomeIcon icon={faMicrochip} /> Комплектующие компьютера
        </Button>
        <Button
          isActive
          onClick={() => navigate('/storage/change-details-history')}
        >
          Посмотреть историю замен
        </Button>
      </ButtonContainer>
      <TypeSelection
        active={type}
        onChange={(type) => {
          setType(type);
          setCategory('');
        }}
      />
      <TableContainer Lg>
        {type === 'technic' && (
          <>
            <select
              className="main__input"
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((item) => {
                return <option key={item.value}>{item.name}</option>;
              })}
            </select>
          </>
        )}
        {
          <>
            {category === 'Компьютер' && <SelectComputer />}
            {category === 'Ноутбук' && <SelectLaptop />}
            {category === 'Монитор' && <SelectScreen />}
            {category === 'МФУ' && <SelectScanner />}
            {category === 'Камера' && <SelectCamera />}
          </>
        }
        {type === 'furniture' && <SelectFurniture />}
        {type === 'ventilation' && <SelectVentilation />}
      </TableContainer>
    </>
  );
}
