import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from 'components/UI/TypeSelection';
import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import SelectFurniture from './SelectStorage/SelectFurniture';
import SelectVentilation from './SelectStorage/SelectVentilation';
import SelectComputer from './SelectStorage/SelectComputer';
import { categories } from 'data/data';
import SelectLaptop from './SelectStorage/SelectLaptop';
import SelectScreen from './SelectStorage/SelectScreen';
import SelectScanner from './SelectStorage/SelectScanner';
import SelectCamera from './SelectStorage/SelectCamera';

export default function Storage() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }
  return (
    <>
      <Header />

      <Button
        isActive
        style={{ marginLeft: '28%' }}
        onClick={() => navigate('/add_storage')}
      >
        Пополнение на склад
      </Button>
      <Button
        isActive
        style={{ marginLeft: '1rem' }}
        onClick={() => navigate('/components')}
      >
        <FontAwesomeIcon icon={faMicrochip} /> Комплектующие компьютера
      </Button>
      <Button
        isActive
        style={{ marginLeft: '1rem' }}
        onClick={() => navigate('/change')}
      >
        Посмотреть историю замен
      </Button>
      <h2 style={{ marginTop: '2rem', textAlign: 'center' }}>
        Описание имеющихся предметов на складе:
      </h2>
      <TypeSelection
        active={type}
        onChange={(type) => {
          setType(type);
          setCategory('');
        }}
      />
      {type === 'technic' && (
        <>
          <select
            id="category"
            style={{ marginLeft: '9rem' }}
            className="control"
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((item) => {
              return <option key={item.value}>{item.name}</option>;
            })}
          </select>
          <button
            style={{ marginLeft: '5px', color: 'red', padding: '7px' }}
            onClick={() => setCategory('')}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      )}
      <section id="sec">
        <div className="sec">
          {
            <>
              {category === 'Компьютер' && (
                <>
                  <SelectComputer />
                </>
              )}
              {category === 'Ноутбук' && (
                <>
                  <SelectLaptop />
                </>
              )}
              {category === 'Монитор' && (
                <>
                  <SelectScreen />
                </>
              )}
              {category === 'МФУ' && (
                <>
                  <SelectScanner />
                </>
              )}
              {category === 'Камера' && (
                <>
                  <SelectCamera />
                </>
              )}
            </>
          }
          {type === 'furniture' && (
            <>
              <SelectFurniture />
            </>
          )}
          {type === 'ventilation' && (
            <>
              {' '}
              <SelectVentilation />
            </>
          )}
        </div>
      </section>
    </>
  );
}
