import { React, useState } from 'react';
import Header from 'components/Header/Header';
import ComponentsSelection from '../components/ComponentsSelection';
import TableContainer from 'components/UI/TableContainer';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  diskColumns,
  memoryColumns,
  mothercardColumns,
  processorColumns,
  videocardColumns,
} from 'data/storageColumns';
import SelectComponent from '../Computer/SelectComponent';

// Конфиг данных
const COMPONENT_CONFIG = {
  videocard: {
    columns: videocardColumns,
  },
  processor: {
    columns: processorColumns,
  },
  mothercard: {
    columns: mothercardColumns,
  },
  memory: {
    columns: memoryColumns,
  },
  disk: {
    columns: diskColumns,
  },
};

export default function ComponentsMenu() {
  const navigate = useNavigate();
  const [type, setType] = useState('');

  return (
    <>
      <Header />
      <ComponentsSelection active={type} onChange={(type) => setType(type)} />
      <TableContainer>
        <div className="component__header">
          <Button isActive onClick={() => navigate('/storage/add-components')}>
            Добавить
            <FontAwesomeIcon
              style={{ marginLeft: '10px' }}
              size="lg"
              icon={faPlus}
            />
          </Button>
          <FontAwesomeIcon
            style={{ marginBottom: '0' }}
            className="navigate-back"
            icon={faArrowLeft}
            onClick={() => navigate(-1)}
          />
        </div>
        {/* Обработка выбранного типа комплектующего */}
        {type && (
          <SelectComponent
            componentType={type}
            columns={COMPONENT_CONFIG[type].columns}
          />
        )}
      </TableContainer>
    </>
  );
}
