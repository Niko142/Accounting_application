import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from '../UI/TypeSelection';
import MainTable from './MainTable';
import {
  camera_column,
  computer_column,
  furniture_column,
  laptop_column,
  scanner_column,
  screen_column,
  ventilation_column,
} from 'data/data';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import { fetchData } from 'services/mainMenu';

export default function MainMenu() {
  const navigate = useNavigate('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState({
    ventilation: [],
    furniture: [],
    computer: [],
    laptop: [],
    screen: [],
    scanner: [],
    camera: [],
  });
  const [loading, setLoading] = useState(false);
  const loadData = async (endpoint, key) => {
    const abortController = new AbortController();
    setLoading(true);
    try {
      const result = await fetchData(endpoint, abortController);
      setData((prev) => ({ ...prev, [key]: result }));
    } catch (err) {
      console.error(`Ошибка при загрузке данных (${endpoint}):`, err);
    } finally {
      setLoading(false);
    }
    return () => abortController.abort();
  };

  useEffect(() => {
    if (type === 'furniture' && data.furniture.length === 0) {
      loadData('main_furniture', 'furniture');
    } else if (type === 'ventilation' && data.ventilation.length === 0) {
      loadData('main_ventilation', 'ventilation');
    }
  }, [type, data]);

  useEffect(() => {
    if (category === 'Компьютер' && data.computer.length === 0) {
      loadData('main_computer', 'computer');
    } else if (category === 'Ноутбук' && data.laptop.length === 0) {
      loadData('main_laptop', 'laptop');
    } else if (category === 'Монитор' && data.screen.length === 0) {
      loadData('main_screen', 'screen');
    } else if (category === 'МФУ' && data.scanner.length === 0) {
      loadData('main_scanner', 'scanner');
    } else if (category === 'Камера' && data.camera.length === 0) {
      loadData('main_camera', 'camera');
    }
  }, [category, data]);

  const categoryOptions = [
    { value: 'Компьютер', column: computer_column, data: data.computer },
    { value: 'Ноутбук', column: laptop_column, data: data.laptop },
    { value: 'Монитор', column: screen_column, data: data.screen },
    { value: 'МФУ', column: scanner_column, data: data.scanner },
    { value: 'Камера', column: camera_column, data: data.camera },
  ];

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => navigate('/utilization')}>
          Записи об утилизации <FontAwesomeIcon size="lg" icon={faTrash} />
        </Button>
      </ButtonContainer>
      <TypeSelection active={type} onChange={(type) => setType(type)} />
      <TableContainer>
        {loading ? (
          <p>Загрузка данных...</p>
        ) : (
          <>
            {type === 'technic' && (
              <>
                <select
                  id="form-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={''}>. . .</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {categoryOptions.map(
                  (option) =>
                    category === option.value && (
                      <MainTable
                        key={option.value}
                        column={option.column}
                        data={option.data}
                      />
                    ),
                )}
              </>
            )}
            {type === 'furniture' && (
              <MainTable data={data.furniture} column={furniture_column} />
            )}
            {type === 'ventilation' && (
              <MainTable data={data.ventilation} column={ventilation_column} />
            )}
          </>
        )}
      </TableContainer>
    </>
  );
}
