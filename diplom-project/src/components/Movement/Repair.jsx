import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import RepairTable from './RepairTable';
import TableContainer from 'components/UI/TableContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMovement } from 'context/MovementContext';
import { enumCategories } from 'data/data';

export default function Repair() {
  const { repairData, isLoading, updateRepairData } = useMovement();
  const navigate = useNavigate();
  const [type, setType] = useState('Все');

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        await updateRepairData(abortController.signal);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Запрос был отменен');
        }
      }
    };

    loadData();

    return () => abortController.abort();
  }, [updateRepairData]);

  if (isLoading) return <div>Загрузка данных...</div>;

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
            {enumCategories.map((category) => (
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
