// import { React } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from 'context/AuthContext';
// import { headerMap } from 'components/Storage/config/config';

// export const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Выйти из системы
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="header">
//       <nav>
//         <div className="header__logo">
//           <img
//             src={process.env.PUBLIC_URL + '/account.png'}
//             height={60}
//             alt="Учет материальных средств"
//           ></img>
//           <span aria-label="Accounting">Учет средств</span>
//         </div>
//         <div className="header__navbar">
//           <ul>
//             {headerMap.map((item) => {
//               return (
//                 <li key={item.name}>
//                   <Link className="link" to={item.link}>
//                     {item.name}
//                   </Link>
//                 </li>
//               );
//             })}
//             {/* Блок с выводом авторизированного пользователя + кнопка 'Выход'*/}
//             <li>
//               <div className="topbar">
//                 <span className="topbar__user">User: {user?.username}</span>
//                 <button className="topbar__logout" onClick={handleLogout}>
//                   Выйти
//                 </button>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { headerMap } from 'components/Storage/config/config';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Выйти из системы
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false); // Закрытие меню при выходе
  };

  // Обработчик переключения меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Закрытие меню
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav>
        <div className="header__logo">
          <img
            src={process.env.PUBLIC_URL + '/account.png'}
            height={60}
            alt="Учет материальных средств"
          />
          <span aria-label="Accounting">Учет средств</span>
        </div>

        {/* Кнопка для бургер-меню */}
        <button
          className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`header__navbar ${isMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            {headerMap.map((item) => {
              return (
                <li key={item.name}>
                  <Link
                    className="link"
                    to={item.link}
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            {/* Блок с выводом авторизированного пользователя + кнопка 'Выход'*/}
            <li>
              <div className="topbar">
                <span className="topbar__user">User: {user?.username}</span>
                <button className="topbar__logout" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
