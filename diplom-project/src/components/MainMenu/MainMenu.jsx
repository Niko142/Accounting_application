// import "./MainMenu.css";
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from './TypeSelection';
import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import MainTable from './MainTable';
import {
  camera_column,
  computer_column,
  furniture_column,
  laptop_column,
  scanner_column,
  screen_column,
  ventilation_column,
} from 'data';

export default function MainMenu() {
  const navigate = useNavigate('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [ventilation, setVentilation] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [computer, setComputer] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [screen, setScreen] = useState([]);
  const [scanner, setScanner] = useState([]);
  const [camera, setCamera] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const ven = await Axios.get('http://localhost:3001/main_ventilation');
      setVentilation(ven.data);
      const fur = await Axios.get('http://localhost:3001/main_furniture');
      setFurniture(fur.data);
      const com = await Axios.get('http://localhost:3001/main_computer');
      setComputer(com.data);
      const lap = await Axios.get('http://localhost:3001/main_laptop');
      setLaptop(lap.data);
      const scr = await Axios.get('http://localhost:3001/main_screen');
      setScreen(scr.data);
      const scan = await Axios.get('http://localhost:3001/main_scanner');
      setScanner(scan.data);
      const cam = await Axios.get('http://localhost:3001/main_camera');
      setCamera(cam.data);
    };
    FetchData();
  }, []);
  return (
    <>
      <Header />
      <Button id="image-button" onClick={() => window.location.reload()}>
        <FontAwesomeIcon icon={faArrowsRotate} /> Обновить
      </Button>
      <Button isActive onClick={() => navigate('/utilization')}>
        Записи об утилизации
      </Button>
      <Button isActive onClick={() => navigate('/repair')}>
        Объекты в ремонте
      </Button>
      <TypeSelection active={type} onChange={(type) => setType(type)} />
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            border: '1px solid #ccc',
            width: '85%',
            height: '500px',
            overflow: 'auto',
          }}
        >
          {type === 'technic' && (
            <>
              <select
                id="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={''}>...</option>
                <option value={'Компьютер'}>Компьютер</option>
                <option value={'Ноутбук'}>Ноутбук</option>
                <option value={'Монитор'}>Монитор</option>
                <option value={'МФУ'}>МФУ</option>
                <option value={'Камера'}>Камера</option>
              </select>
              {category === 'Компьютер' && (
                <>
                  <MainTable column={computer_column} data={computer} />
                </>
              )}
              {category === 'Ноутбук' && (
                <>
                  <MainTable column={laptop_column} data={laptop} />
                </>
              )}
              {category === 'Монитор' && (
                <>
                  <MainTable column={screen_column} data={screen} />
                </>
              )}
              {category === 'МФУ' && (
                <>
                  <MainTable column={scanner_column} data={scanner} />
                </>
              )}
              {category === 'Камера' && (
                <>
                  <MainTable column={camera_column} data={camera} />
                </>
              )}
            </>
          )}
          {type === 'furniture' && (
            <>
              <MainTable data={furniture} column={furniture_column} />
            </>
          )}
          {type === 'ventilation' && (
            <>
              <MainTable data={ventilation} column={ventilation_column} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
