import { FC } from "react";
import "./header.scss";

export const Header: FC = () => {
    
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <div className="container">
            CRM Skrama 24
          </div>
        </div>
        <nav className="header__nav">
          <ul>
            <li>Сотрудники</li>
            <li>Клиенты</li>
            <li>Дела</li>
            <li>Сделки</li>
            <li>Документы</li>
          </ul>
        </nav>  
        <div className="header__user">
          <div className="logo">

          </div>
          <div className="name">
            Артём
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;