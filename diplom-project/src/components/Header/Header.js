import { Link } from 'react-router-dom'
import './Header.css'
export default function Header(){
  return(
    <header>
        <div id="top-header">
            <div id="logo">
                <section><img src={process.env.PUBLIC_URL + '/account.png'} width={'40'} height={''} alt='Учет'></img></section>
                <h1>Учет средств</h1>
            </div>
            <nav>
                <div id="menu">
                    <ul>
                      <li><Link className='link' to="/main_menu">Учет</Link></li>
                      <li><Link className='link' to="/employee">Материально-ответственные лица</Link></li>
                      <li><Link className='link' to="/account">Склад</Link></li>
                      <li><Link className='link' to="/movement">Перемещение</Link></li>
                      <li><Link className='link' to="/office">Канцелярия</Link></li>
                      <li><Link className='link' to="/">Выход</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
  )
}