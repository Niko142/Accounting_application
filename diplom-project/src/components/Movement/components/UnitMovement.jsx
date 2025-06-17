import { React, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faComputer,
  faLaptop,
  faDisplay,
  faPrint,
  faVideo,
  faChair,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PinningComputer from '../forms/PinningComputer';
import PinningLaptop from '../forms/PinningLaptop';
import PinningScreen from '../forms/PinningScreen';
import PinningScanner from '../forms/PinningScanner';
import PinningCamera from '../forms/PinningCamera';
import PinningFurniture from '../forms/PinningFurniture';
import TableContainer from 'components/UI/TableContainer';

const navItems = [
  { type: 'Компьютер', icon: faComputer, component: <PinningComputer /> },
  { type: 'Ноутбук', icon: faLaptop, component: <PinningLaptop /> },
  { type: 'Монитор', icon: faDisplay, component: <PinningScreen /> },
  { type: 'МФУ', icon: faPrint, component: <PinningScanner /> },
  { type: 'Камера', icon: faVideo, component: <PinningCamera /> },
  { type: 'Мебель', icon: faChair, component: <PinningFurniture /> },
];

export default function UnitMovement() {
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);

  const CurrentComponent = useMemo(() => {
    return navItems.find((item) => item.type === type)?.component || null;
  }, [type]);

  return (
    <>
      <TableContainer Lg>
        <header className="unit-movement__header">
          <button
            aria-label="Раскрыть меню для выбора категории"
            className="unit-movement__burger-menu"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            className="unit-movement__close-icon"
            aria-label="Закрыть форму и стереть введенные данные"
          >
            <FontAwesomeIcon
              size="xl"
              icon={faXmark}
              onClick={() => setType(null)}
            />
          </button>
        </header>
        <div className="unit-movement__content">
          <nav className={`unit-movement__nav ${open ? 'active' : ''}`}>
            <ul>
              {navItems.map(({ type, icon }) => (
                <li
                  key={type}
                  className="unit-movement__list-item"
                  onClick={() => setType(type)}
                >
                  <FontAwesomeIcon
                    className="unit-movement__icon"
                    icon={icon}
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </nav>

          <article className="unit-movement__form">
            <h3>Оформление перемещения (не со склада)</h3>
            {CurrentComponent}
          </article>
        </div>
      </TableContainer>
    </>
  );
}
