import { React, useState } from 'react';
import './CabinetSection.css';
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

export default function UnitMovement() {
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
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
              <li
                className="unit-movement__list-item"
                onClick={() => setType('Компьютер')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faComputer}
                />
                <span>Компьютер</span>
              </li>
              <li
                className="unit-movement__list-item"
                onClick={() => setType('Ноутбук')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faLaptop}
                />
                <span>Ноутбук</span>
              </li>
              <li
                className="unit-movement__list-item"
                onClick={() => setType('Монитор')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faDisplay}
                />
                <span>Монитор</span>
              </li>
              <li
                className="unit-movement__list-item"
                onClick={() => setType('МФУ')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faPrint}
                />
                <span>МФУ</span>
              </li>
              <li
                className="unit-movement__list-item"
                onClick={() => setType('Камера')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faVideo}
                />
                <span>Камера</span>
              </li>
              <li
                className="unit-movement__list-item"
                onClick={() => setType('Мебель')}
              >
                <FontAwesomeIcon
                  className="unit-movement__icon"
                  icon={faChair}
                />
                <span>Мебель</span>
              </li>
            </ul>
          </nav>
          <article>
            <h3 style={{ textAlign: 'center' }}>
              Форма для оформления перемещения
            </h3>
            {type === 'Компьютер' && <PinningComputer />}
            {type === 'Ноутбук' && <PinningLaptop />}
            {type === 'Монитор' && <PinningScreen />}
            {type === 'МФУ' && <PinningScanner />}
            {type === 'Камера' && <PinningCamera />}
            {type === 'Мебель' && <PinningFurniture />}
          </article>
        </div>
      </TableContainer>
    </>
  );
}
