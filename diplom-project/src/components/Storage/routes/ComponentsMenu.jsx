import { React, useState } from 'react';
import Header from 'components/Header/Header';
import ComponentsSelection from '../components/ComponentsSelection';
import SelectComponent from '../components/SelectComponent';
import TableContainer from 'components/UI/TableContainer';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { COMPONENT_CONFIG, componentMap } from '../config/config';

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
            componentType={componentMap[type]}
            columns={COMPONENT_CONFIG[type].columns}
          />
        )}
      </TableContainer>
    </>
  );
}
