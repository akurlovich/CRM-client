import React, { FC, useEffect, useState } from 'react';
import { UNSAFE_useRouteId } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCompany, getAllCompanies } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllUsers } from '../../../store/reducers/UserReducer/UserActionCreators';
import { ICompanyNew } from '../../../types/ICompany';
import './addcompany.scss';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCompanyInner: FC<IProps> = ({isVisible = false, onClose}) => {
  //!----берет данные из компанента Company------
  // const { companies } = useAppSelector(state => state.companyReducer);
  // const { users } = useAppSelector(state => state.userReducer);
  // const dispatch = useAppDispatch();

  const [newCompany, setNewCompany] = useState<ICompanyNew>({title: '', usersID: ['65a112acc11882f036f9cf74'] as string[]} as ICompanyNew);
  // setNewCompany(prev => ({...prev, title: 'new'}));

  const addNewCompanyHandler = async () => {
    // const newUser = [...newCompany.usersID, '657bf93c2f7bf96da48e91cc'];
    // setNewCompany(prev => ({...prev, usersID: ['657bf93c2f7bf96da48e91cc']}));
    // setNewCompany(prev => ({...prev, usersID: ['657bf93c2f7bf96da48e91cc']}));
    // setNewCompany(newCompany.usersID.push(''));
    // console.log(newCompany);
    alert('отключена отправка')
    // await dispatch(addCompany(newCompany));

  };


  const keydownHandler = ({ key }: {key: string}) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    // dispatch(getAllCompanies());
    // dispatch(getAllUsers());
    // console.log('show');
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  // useEffect(() => {
  //   console.log('companies', companies);
  //   console.log('users', users);
   
  // }, [companies, users]);

  return isVisible ? (
    <div className="add-company">
      <div className="add-company__dialog">
        <div className="add-company__header">
          <h3 className="add-company__title">Новый клиент</h3>
        </div>
        <form className="add-company__body">
          <div className="add-company__input">
            <span className='required'>Название</span>
            <input 
              value={newCompany.title}
              onChange={(e: React.FocusEvent<HTMLInputElement>) => setNewCompany(prev => ({...prev, title: e.target.value}))}
              type="text"
              placeholder='ООО "Моя компания'/>
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
            onClick={addNewCompanyHandler}
            type="submit"
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