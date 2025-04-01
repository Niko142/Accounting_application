import { React, useState } from 'react';
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
import PinningComputer from './PinningComputer';
import PinningLaptop from './PinningLaptop';
import PinningScreen from './PinningScreen';
import PinningScanner from './PinningScanner';
import PinningCamera from './PinningCamera';
import PinningFurniture from './PinningFurniture';
import TableContainer from 'components/UI/TableContainer';

// Отрефакторить код

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

  const currentComponent = navItems.find(
    (item) => item.type === type,
  )?.component;

  return (
    <>
      <TableContainer>
        <header className="unit-movement__header">
          <button
            className="unit-movement__burger-menu"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <FontAwesomeIcon
            size="xl"
            className="unit-movement__close-icon"
            icon={faXmark}
            onClick={() => setType(null)}
          />
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
            <h3>Форма для оформления перемещения</h3>
            {currentComponent}
          </article>
        </div>
      </TableContainer>
    </>
  );
}
