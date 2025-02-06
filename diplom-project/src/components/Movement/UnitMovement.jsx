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
export default function UnitMovement() {
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          border: '3px solid #000',
          width: '70%',
          height: '500px',
          borderRadius: '10px',
        }}
      >
        <div className="dropdown">
          <button className="dropdown-button" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            style={{
              border: '0',
              color: '#fff',
              backgroundColor: '#0074D9',
              fontSize: '30px',
              cursor: 'pointer',
            }}
            onClick={() => setType('')}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <nav className={`dropdown-nav ${open ? 'active' : ''}`}>
          <ul className="dropdown-list">
            <li className="list" onClick={() => setType('Компьютер')}>
              <FontAwesomeIcon className="icon" icon={faComputer} />
              <span>Компьютер</span>
            </li>
            <li className="list" onClick={() => setType('Ноутбук')}>
              <FontAwesomeIcon className="icon" icon={faLaptop} />
              <span>Ноутбук</span>
            </li>
            <li className="list" onClick={() => setType('Монитор')}>
              <FontAwesomeIcon className="icon" icon={faDisplay} />
              <span>Монитор</span>
            </li>
            <li className="list" onClick={() => setType('МФУ')}>
              <FontAwesomeIcon className="icon" icon={faPrint} />
              <span>МФУ</span>
            </li>
            <li className="list" onClick={() => setType('Камера')}>
              <FontAwesomeIcon className="icon" icon={faVideo} />
              <span>Камера</span>
            </li>
            <li className="list" onClick={() => setType('Мебель')}>
              <FontAwesomeIcon className="icon" icon={faChair} />
              <span>Мебель</span>
            </li>
          </ul>
        </nav>
        <div
          style={{
            width: '70%',
            height: '450px',
            float: 'right',
            borderLeft: '3px solid #000',
          }}
        >
          <section style={{ border: '1px solid #ccc', textAlign: 'center' }}>
            <h4 style={{ fontSize: '20px' }}>
              Форма для оформления перемещения
            </h4>
          </section>
          {type === 'Компьютер' && <PinningComputer />}
          {type === 'Ноутбук' && <PinningLaptop />}
          {type === 'Монитор' && <PinningScreen />}
          {type === 'МФУ' && <PinningScanner />}
          {type === 'Камера' && <PinningCamera />}
          {type === 'Мебель' && <PinningFurniture />}
        </div>
      </div>
    </>
  );
}
