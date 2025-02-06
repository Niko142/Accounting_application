import { React } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="header__logo">
          <img
            src={process.env.PUBLIC_URL + '/account.png'}
            height={60}
            alt="Учет материальных средств"
          ></img>
          <span aria-label="Accounting">Учет средств</span>
        </div>
        <div className="header__navbar">
          <ul>
            <li>
              <Link className="link" to="/main_menu">
                Учет
              </Link>
            </li>
            <li>
              <Link className="link" to="/employee">
                Материально-ответственные лица
              </Link>
            </li>
            <li>
              <Link className="link" to="/account">
                Склад
              </Link>
            </li>
            <li>
              <Link className="link" to="/movement">
                Перемещение
              </Link>
            </li>
            <li>
              <Link className="link" to="/office">
                Канцелярия
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Выход
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
