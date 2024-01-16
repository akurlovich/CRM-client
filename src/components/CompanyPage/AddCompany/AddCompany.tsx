import React, { FC, useEffect, useState } from 'react';
import { UNSAFE_useRouteId } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCompany, getAllCompanies } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { addContact } from '../../../store/reducers/ContactReducer/ContactActionCreators';
import { getAllUsers } from '../../../store/reducers/UserReducer/UserActionCreators';
import { ICompanyNew } from '../../../types/ICompany';
import { IContactNew } from '../../../types/IContact';
import './addcompany.scss';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCompanyInner: FC<IProps> = ({isVisible = false, onClose}) => {
  //!----берет данные из компанента Company------
  // const { companies } = useAppSelector(state => state.companyReducer);
  // const { users } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const [newCompany, setNewCompany] = useState<ICompanyNew>({title: '', usersID: '65a4ed82f45087cf955a9bac'} as ICompanyNew);
  // const [newCompany, setNewCompany] = useState<ICompanyNew>({title: '', usersID: '657bf93c2f7bf96da48e91cc', contactID: '65a619932267f6b47b2ae804'} as ICompanyNew);
  const [newContact, setNewContact] = useState<IContactNew>(
    {
      address: {main: '', district: ''}, 
      phonesID: { number: '', description: ''}, 
      emailsID: { email: '', description: ''}
    } as IContactNew);
  // setNewCompany(prev => ({...prev, title: 'new'}));

  const addNewCompanyHandler = async () => {
    // const newUser = [...newCompany.usersID, '657bf93c2f7bf96da48e91cc'];
    // setNewCompany(prev => ({...prev, usersID: ['657bf93c2f7bf96da48e91cc']}));
    // setNewCompany(prev => ({...prev, usersID: ['657bf93c2f7bf96da48e91cc']}));
    // setNewCompany(newCompany.usersID.push(''));
    // console.log('from addcompany', newCompany);
    // alert('отключена отправка')
    // await dispatch(addContact(newContact));
    await dispatch(addCompany({company: newCompany, contact: newContact}));

  };

  const contactHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'contact.address.main':
        setNewContact(prev => ({...prev, address: { main: e.target.value, district: newContact.address.district }}));
        break;
      case 'contact.address.district':
        setNewContact(prev => ({...prev, address: { main: newContact.address.main, district: e.target.value }}));
        break;    
      case 'contact.phone.description':
        setNewContact(prev => ({...prev, phonesID: { number: newContact.phonesID.number, description: e.target.value }}));
        break;
      case 'contact.phone.number':
        setNewContact(prev => ({...prev, phonesID: { number: e.target.value, description: newContact.phonesID.description }}));
        break;
      case 'contact.email.email':
        setNewContact(prev => ({...prev, emailsID: { email: e.target.value, description: newContact.emailsID.description }}));
        break;
      case 'contact.email.description':
        setNewContact(prev => ({...prev, emailsID: { description: e.target.value, email: newContact.emailsID.email }}));
        break;
      default:
        break;
    }
    // setNewContact(prev => ({...prev, address: {main: '', district: e.target.value}}));
    // console.log(e.target.name);
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
            <input 
              value={newContact.phonesID.number}
              onChange={contactHandler}
              type="text" 
              name="contact.phone.number" 
              placeholder='+375296654556'/>
            <input 
              value={newContact.phonesID.description}
              onChange={contactHandler}
              type="text" 
              name="contact.phone.description"  
              placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Почта</span>
            <input 
              value={newContact.emailsID.email}
              onChange={contactHandler}
              type="text" 
              name="contact.email.email" 
              placeholder='example@tut.by'/>
            <input 
              value={newContact.emailsID.description}
              onChange={contactHandler}
              type="text" 
              name="contact.email.description" 
              placeholder='комментарий'/>
          </div>
          <div className="add-company__input">
            <span>Адрес</span>
            <input 
              value={newContact.address.main}
              onChange={contactHandler}
              type='text'
              name='contact.address.main' 
              placeholder='Область, город и тд.'/>
          </div>
          <div className="add-company__input">
            <span>Район</span>
            <input 
              value={newContact.address.district}
              onChange={contactHandler}
              name='contact.address.district'
              type="text" 
              placeholder='Район...'/>
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