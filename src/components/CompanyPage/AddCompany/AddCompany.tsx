import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllCompanies } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import './addcompany.scss';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCompanyInner: FC<IProps> = ({isVisible = false, onClose}) => {

  const { companies } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();


  const keydownHandler = ({ key }: {key: string}) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    dispatch(getAllCompanies());
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return isVisible ? (
    <div className="add-company">
      <div className="add-company__dialog">
        <div className="add-company__header">
          <h3 className="add-company__title">Новый клиент</h3>
        </div>
        <form className="add-company__body">
          <div className="add-company__input">
            <span className='required'>Название</span>
            <input type="text" name="" id="" placeholder='ООО "Моя компания'/>
          </div>
          <div className="add-company__input">
            <span>Телефон</span>
            <input type="text" name="" id="" placeholder='+375296654556'/>
            <input type="text" name="" id="" placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Почта</span>
            <input type="text" name="" id="" placeholder='example@tut.by'/>
            <input type="text" name="" id="" placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Адрес</span>
            <input type="text" name="" id="" placeholder='Область, город и тд.'/>
          </div>
        </form>
        <div className="add-company__footer">
          <button 
            onClick={() => console.log(companies)}
            // type="submit"
            >
            Добавить
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  ) : null;
}

export const AddCompany = React.memo(AddCompanyInner);