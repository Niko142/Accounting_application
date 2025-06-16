import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from '../UI/TypeSelection';
import {
  ventilationColumns,
  furnitureColumns,
  categoryOptions,
} from 'data/columns';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import { fetchData } from 'services/mainMenu';
import DataTable from 'components/Table/Table';

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
      loadData('furnitures', 'furniture');
    } else if (type === 'ventilation' && data.ventilation.length === 0) {
      loadData('ventilations', 'ventilation');
    }
  }, [type, data]);

  useEffect(() => {
    if (category === 'Компьютер' && data.computer.length === 0) {
      loadData(`computers`, 'computer');
    } else if (category === 'Ноутбук' && data.laptop.length === 0) {
      loadData('laptops', 'laptop');
    } else if (category === 'Монитор' && data.screen.length === 0) {
      loadData('screens', 'screen');
    } else if (category === 'МФУ' && data.scanner.length === 0) {
      loadData('scanners', 'scanner');
    } else if (category === 'Камера' && data.camera.length === 0) {
      loadData('cameras', 'camera');
    }
  }, [category, data]);

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
                  className="main__input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={''}>. . .</option>
                  {categoryOptions(data).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {categoryOptions(data).map(
                  (option) =>
                    category === option.value && (
                      <DataTable
                        key={option.value}
                        head={option.column}
                        mockData={option.data}
                      />
                    ),
                )}
              </>
            )}
            {type === 'furniture' && (
              <DataTable head={furnitureColumns} mockData={data.furniture} />
            )}
            {type === 'ventilation' && (
              <DataTable
                head={ventilationColumns}
                mockData={data.ventilation}
              />
            )}
          </>
        )}
      </TableContainer>
    </>
  );
}
