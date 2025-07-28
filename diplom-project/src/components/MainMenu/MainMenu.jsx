import { React, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from 'services/mainMenu';
import { CATEGORY_MAIN_CONFIG } from 'components/Storage/config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TypeSelection from '../UI/TypeSelection';
import ButtonContainer from 'components/UI/ButtonContainer';
import TableContainer from 'components/UI/TableContainer';
import DataTable from 'components/Table/Table';

export default function MainMenu() {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState({
    ventilations: [],
    furniture: [],
    computers: [],
    laptops: [],
    screens: [],
    scanners: [],
    cameras: [],
  });

  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    async (dataKey) => {
      if (!dataKey || data[dataKey]?.length > 0) return;
      const abortController = new AbortController();

      setLoading(true);
      await new Promise((req) => requestAnimationFrame(req));
      try {
        const result = await fetchData(dataKey, abortController);
        setData((prev) => ({ ...prev, [dataKey]: result }));
      } catch (err) {
        console.error(`Ошибка при загрузке данных (${dataKey}):`, err);
      } finally {
        setLoading(false);
      }
      return () => abortController.abort();
    },
    [data],
  );

  // Загрузка данных для мебели и вентиляции
  useEffect(() => {
    if (type === 'furniture' || type === 'ventilation') {
      const item = CATEGORY_MAIN_CONFIG.find((i) => i.type === type);
      if (item?.dataKey) {
        loadData(item.dataKey);
      }
    }
  }, [type, loadData]);

  // Загрузка данных для оргтехники
  useEffect(() => {
    if (type === 'technic' && category) {
      const item = CATEGORY_MAIN_CONFIG.find(
        (i) => i.type === 'technic' && i.value === category,
      );
      if (item?.dataKey) {
        loadData(item.dataKey);
      }
    }
  }, [type, category, loadData]);

  return (
    <>
      <Header />
      <ButtonContainer>
        <Button isActive onClick={() => navigate('/utilization')}>
          Записи об утилизации <FontAwesomeIcon size="lg" icon={faTrash} />
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
              <option disabled value="">
                Выберите тип оргтехники ...
              </option>
              {CATEGORY_MAIN_CONFIG.filter((obj) => obj.type === 'technic').map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ),
              )}
            </select>
            {CATEGORY_MAIN_CONFIG.map(
              (item) =>
                item.type === 'technic' &&
                item.value === category && (
                  <DataTable
                    key={item.value}
                    head={item.column}
                    mockData={data[item.dataKey]}
                    isLoading={loading}
                  />
                ),
            )}
          </>
        )}

        {(type === 'furniture' || type === 'ventilation') &&
          CATEGORY_MAIN_CONFIG.map(
            (item) =>
              item.type === type && (
                <DataTable
                  key={item.value}
                  head={item.column}
                  mockData={data[item.dataKey]}
                  isLoading={loading}
                />
              ),
          )}
      </TableContainer>
    </>
  );
}
