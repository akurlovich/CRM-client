import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { IoPencilOutline } from '@react-icons/all-files/io5/IoPencilOutline';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { deleteEmailFromContactByPhoneID } from '../../../../../store/reducers/ContactReducer/ContactActionCreators';
import { addEmail, updateEmailByID } from '../../../../../store/reducers/EmailReducer/EmailActionCreators';
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { IEmail, IEmailNewAddContacts } from '../../../../../types/IEmail';

// interface IProps {
//   items: IEmail[];
//   query: ICompaniesQuery;
// }

const ContactsEmailsInner: FC = ({}) => {
  const { company, query } = useAppSelector(state => state.companyReducer);

  const dispatch = useAppDispatch();

  const [showUpdateInput, setShowUpdateInput] = useState({show: false, itemID: ''});

  const [showAddInputs, setShowAddInputs] = useState(false);

  const [addEmailAndUpdateContact, setAddEmailAndUpdateContact] = useState<IEmailNewAddContacts>({ contactID: company.contactID?._id, 
    email: { 
      companyID: company._id, 
      email: '', 
      description: ''
    }} as IEmailNewAddContacts);

  const showAddEmailHandler = () => {
    setShowUpdateInput({show: false, itemID: ''});
    setAddEmailAndUpdateContact(prev => ({
      ...prev,
      email : {
        ...prev.email,
        email: '',
        description: '',
      }
    }))
    setShowAddInputs(true);
  };

  const updateEmailHandler = async () => {
    const email = {
      emailID: showUpdateInput.itemID, 
      email: {
        email: addEmailAndUpdateContact.email.email, 
        description: addEmailAndUpdateContact.email.description
    }};
    
    await dispatch(updateEmailByID(email));
    await dispatch(getCompanyByIDQuery(query));
    setShowUpdateInput({show: false, itemID: ''});
  };

  const updateShowEmailHandler = (show: boolean, itemID: string, number: string, description: string) => {
    setShowUpdateInput({show: show, itemID: itemID});
    setAddEmailAndUpdateContact(prev => ({
      ...prev,
      email : {
        ...prev.email,
        email: number,
        description: description,
      }
    }))
    setShowAddInputs(false);
  };

  const deleteEmailHandler = async (id: string) => {
    if (window.confirm("Удалить почту?")) {
      await dispatch(deleteEmailFromContactByPhoneID(id));
      await dispatch(getCompanyByIDQuery(query));
    }
  };

  const addEmailHandler = async () => {
    const reqex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const result = reqex.test(addEmailAndUpdateContact.email.email);
    await dispatch(addEmail(addEmailAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    setShowAddInputs(prev => (false));
  };

  const addOrUpdateInputsHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email.email':
        setAddEmailAndUpdateContact(prev => ({
          ...prev,
          email : {
            ...prev.email,
            email: e.target.value
          }
        }))
        break;
      case 'email.description':
        setAddEmailAndUpdateContact(prev => ({
          ...prev,
          email : {
            ...prev.email,
            description: e.target.value
          }
        }))
        break;
      case 'email.email.update':
        setAddEmailAndUpdateContact(prev => ({
          ...prev,
          email : {
            ...prev.email,
            email: e.target.value
          }
        }))
        break;
      case 'email.description.update':
        setAddEmailAndUpdateContact(prev => ({
          ...prev,
          email : {
            ...prev.email,
            description: e.target.value
          }
        }))
        break;
      
      default:
        break;
    }
  };

  return (
    <>
      <div className="title">
        <span>Почта</span>
        <IoAddOutline 
          style={{cursor: 'pointer'}}
          onClick={showAddEmailHandler}
          size={20}/>
      </div>

      {company.contactID ? company.contactID.emailsID.map(item => (
        <div key={item._id} className="data">
          {showUpdateInput.itemID === item._id ? 
            <div className="contactsblock__contacts__inputs update">
              <input 
                value={addEmailAndUpdateContact.email.email}
                onChange={addOrUpdateInputsHandler}
                type="text" 
                name="email.email.update" 
                placeholder='example@tut.by'/>
              <input
                value={addEmailAndUpdateContact.email.description}
                onChange={addOrUpdateInputsHandler}
                type="text" 
                name="email.description.update" 
                placeholder='комментарий'/>
              <button
                className='add-btn'
                onClick={updateEmailHandler}>
                Изменить
              </button>
              <button
                className='cansel-btn'
                onClick={() => setShowUpdateInput({show: false, itemID: ''})}>
                Отмена
              </button>
            </div>
            :
            <div className="text">
              <span className='span-email'>{item.email}</span>
              <span>{item.description}</span>
            </div>
          }
          {showUpdateInput.itemID === item._id ? null :
            <div className="icons">
              <IoPencilOutline 
                style={{cursor: 'pointer'}}
                onClick={() => updateShowEmailHandler(true, item._id, item.email, item.description)}
                size={20}/>
              <IoTrashOutline
                onClick={() => deleteEmailHandler(item._id)}
                style={{cursor: 'pointer'}}
                size={20}/>
            </div>
          }
        </div>
        )) : null
      }

      {showAddInputs && 
        <div className="contactsblock__contacts__inputs">
          <input 
            value={addEmailAndUpdateContact.email.email}
            onChange={addOrUpdateInputsHandler}
            type="text" 
            name="email.email" 
            placeholder='example@tut.by'/>
          <input
            value={addEmailAndUpdateContact.email.description}
            onChange={addOrUpdateInputsHandler}
            type="text" 
            name="email.description" 
            placeholder='комментарий'/>
          <button
            className='add-btn'
            onClick={addEmailHandler}>
            Добавить
          </button>
          <button
            className='cansel-btn'
            onClick={() => setShowAddInputs(false)}>
            Отмена
          </button>
        </div>
      }
    </>
  )
}

export const ContactsEmails = React.memo(ContactsEmailsInner)