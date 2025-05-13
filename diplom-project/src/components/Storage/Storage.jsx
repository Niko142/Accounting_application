import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from 'data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { OBJECT_CONFIG } from './config/config';

import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';

import SelectStorageComponent from './components/SelectStorageComponent';

export default function Storage() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

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
      <TableContainer>
        {type === 'technic' && (
          <>
            <select
              className="main__input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </>
        )}

        {category && OBJECT_CONFIG[category] && (
          <SelectStorageComponent
            objectType={category}
            columns={OBJECT_CONFIG[category].columns}
            idField={OBJECT_CONFIG[category].id}
          />
        )}

        {type === 'furniture' && (
          <SelectStorageComponent
            objectType="furniture"
            columns={OBJECT_CONFIG.furniture.columns}
            idField={OBJECT_CONFIG.furniture.id}
          />
        )}

        {type === 'ventilation' && (
          <SelectStorageComponent
            objectType="ventilation"
            columns={OBJECT_CONFIG.ventilation.columns}
            idField={OBJECT_CONFIG.ventilation.id}
          />
        )}
      </TableContainer>
    </>
  );
}
