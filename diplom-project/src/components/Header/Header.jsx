import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/FormAuthorization';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              <Link className="link" to="/storage">
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
            {/* Блок с выводом авторизированного пользователя + кнопка 'Выход'*/}
            <div className="topbar">
              <span className="topbar__user" style={{ color: '#444' }}>
                User: {user.username}
              </span>
              <button className="topbar__logout" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
