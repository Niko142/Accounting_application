import { React, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import RepairTable from '../components/RepairTable';
import TableContainer from 'components/UI/TableContainer';
import { useMovement } from 'context/MovementContext';
import { enumCategories } from 'data/data';
import ReturnButton from 'components/UI/ReturnButton';

export default function Repair() {
  const { repairData, updateRepairData } = useMovement();
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

  return (
    <section className="repair-block">
      <Header />
      <TableContainer>
        <div className="repair-block__header">
          <h2>Материальные средства в ремонте</h2>
          <ReturnButton />
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
