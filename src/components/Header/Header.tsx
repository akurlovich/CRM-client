import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutUser } from "../../store/reducers/AuthReducer/AuthActionCreatores";
import "./header.scss";

export const Header: FC = () => {
  const { isAuth, user } = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
    
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <div className="container">
            <span>CRM</span>
            <span>skrama</span>
            <span>24</span>
          </div>
        </div>
        <nav className="header__nav">
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? 'header__nav__item active' : 'header__nav__item'}>
            Сотрудники
          </NavLink>
          <NavLink
            to='/companies'
            className={({ isActive }) => isActive ? 'header__nav__item active' : 'header__nav__item'}>
            Клиенты
          </NavLink>
          <NavLink
            to='/deals'
            className={({ isActive }) => isActive ? 'header__nav__item active' : 'header__nav__item'}>
            Дела
          </NavLink>
          <NavLink
            to='/orders'
            className={({ isActive }) => isActive ? 'header__nav__item active' : 'header__nav__item'}>
            Сделки
          </NavLink>
          <NavLink
            to='/documents'
            className={({ isActive }) => isActive ? 'header__nav__item active' : 'header__nav__item'}>
            Документы
          </NavLink>
          {/* <ul>
            <li>Сотрудники</li>
            <li className="active">Клиенты</li>
            <li>Дела</li>
            <li>Сделки</li>
            <li>Документы</li>
          </ul> */}
        </nav> 
        {isAuth ? 
          <div 
            className="header__user">
            <span
              style={{'backgroundColor': `${user.avatar}`}}
              >{user.lastname[0] + user.firstname[0]}</span>
            <span>{user.lastname + ' ' + user.firstname}</span>
            <button
              onClick={() => dispatch(logoutUser())}>
              Выйти</button>
          </div>
          : 
          <div>Войдите</div>
        } 
      </div>
    </header>
  );
};

export default Header;