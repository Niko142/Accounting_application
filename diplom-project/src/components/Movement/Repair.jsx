import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import RepairTable from './RepairTable';
import TableContainer from 'components/UI/TableContainer';
import { instance } from 'services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Repair() {
  const navigate = useNavigate();
  const [type, setType] = useState('Все');
  const [repairData, setRepairData] = useState({
    Все: [],
    Компьютер: [],
    Ноутбук: [],
    Монитор: [],
    МФУ: [],
    Камера: [],
    Мебель: [],
    'Система вентиляции': [],
  });

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const categories = [
        'computer',
        'laptop',
        'screen',
        'scanner',
        'camera',
        'furniture',
        'ventilation',
      ];
      const requests = categories.map((cat) =>
        instance.get(`/select_repair_${cat}`),
      );

      const results = await Promise.all([
        instance.get('/select_repair'),
        ...requests,
      ]);

      const allData = results[0].data;
      const categoryData = results.slice(1);

      setRepairData({
        Все: allData,
        Компьютер: categoryData[0].data,
        Ноутбук: categoryData[1].data,
        Монитор: categoryData[2].data,
        МФУ: categoryData[3].data,
        Камера: categoryData[4].data,
        Мебель: categoryData[5].data,
        'Система вентиляции': categoryData[6].data,
      });
    } catch (err) {
      console.log('Ошибка при загрузке данных', err);
    }
  };

  const categories = [
    'Все',
    'Компьютер',
    'Ноутбук',
    'Монитор',
    'МФУ',
    'Камера',
    'Мебель',
    'Система вентиляции',
  ];

  return (
    <section className="repair-block">
      <Header />
      <TableContainer>
        <div className="repair-block__header">
          <h2>Материальные средства в ремонте</h2>
          <FontAwesomeIcon
            className="navigate-back"
            icon={faArrowLeft}
            onClick={() => navigate(-1)}
          />
        </div>
        <nav className="repair-block__menu">
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={`repair-block__menu__item ${type === category ? 'active' : ''}`}
                onClick={() => setType(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </nav>
        <RepairTable repair={repairData[type]} />
      </TableContainer>
    </section>
  );
}
