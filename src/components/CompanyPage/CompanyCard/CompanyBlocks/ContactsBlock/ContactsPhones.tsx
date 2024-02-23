import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { IoPencil } from '@react-icons/all-files/io5/IoPencil';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import { IoStarSharp } from '@react-icons/all-files/io5/IoStarSharp';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { validPhone } from '../../../../../services/ClientServices/validPhone';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { deletePhoneFromContactByPhoneID } from '../../../../../store/reducers/ContactReducer/ContactActionCreators';
import { addPhone, updatePhoneByID, updatePhoneIsActive } from '../../../../../store/reducers/PhoneReducer/PhoneActionCreators';
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { IPhone, IPhoneNewAddContacts } from '../../../../../types/IPhone';
import { UserErrorWarning } from '../../../../UI/UserErrorWarning/UserErrorWarning';

// interface IProps {
//   items: IPhone[];
//   query: ICompaniesQuery;
// }
//TODO   сделать возможность изменять цвет иконок через css variables
const ContactsPhonesInner: FC = ({}) => {
  const { company, query } = useAppSelector(state => state.companyReducer);
  const { error: errorPhone } = useAppSelector(state => state.phoneReducer);

  const dispatch = useAppDispatch();

  const [showUpdateInput, setShowUpdateInput] = useState({show: false, itemID: ''});

  const [showAddInputs, setShowAddInputs] = useState(false);

  const [addPhoneAndUpdateContact, setAddPhoneAndUpdateContact] = useState<IPhoneNewAddContacts>({ contactID: company.contactID?._id, 
    phone: { 
      companyID: company._id, 
      number: '', 
      description: ''
    }} as IPhoneNewAddContacts);

  // const [phoneUpdateValue, setPhoneUpdateValue] = useState<number>(NaN)

  const showAddPhoneHandler = () => {
    setAddPhoneAndUpdateContact(prev => ({
      ...prev,
      phone : {
        ...prev.phone,
        number: '',
        description: '',
      }
    }))
    setShowUpdateInput({show: false, itemID: ''})
    setShowAddInputs(true);
  };

  const updatePhoneHandler = async () => {
    const phone = {
      phoneID: showUpdateInput.itemID, 
      phone: {
        number: addPhoneAndUpdateContact.phone.number, 
        description: addPhoneAndUpdateContact.phone.description
    }};

    // console.log(phone)
    
    await dispatch(updatePhoneByID(phone));
    await dispatch(getCompanyByIDQuery(query));
    // await dispatch(getAllPhones());
    setShowUpdateInput({show: false, itemID: ''});
  };

  const updateShowPhoneHandler = (show: boolean, itemID: string, number: string, description: string) => {
    setShowUpdateInput({show: show, itemID: itemID});
    setAddPhoneAndUpdateContact(prev => ({
      ...prev,
      phone : {
        ...prev.phone,
        number: number,
        description: description,
      }
    }))
    setShowAddInputs(false);
  };

  const deletePhoneHandler = async (id: string) => {
    if (window.confirm("Удалить контакт?")) {
      await dispatch(deletePhoneFromContactByPhoneID(id));
      await dispatch(getCompanyByIDQuery(query));
    }
  };

  const updateIsActiveHandler = async (id: string, isActive: boolean) => {
    await dispatch(updatePhoneIsActive({phoneID: id, isActive: isActive}));
    await dispatch(getCompanyByIDQuery(query));
  };

  const addPhoneHandler = async () => {
    // const reqex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,12}(\s*)?$/;
    // const reqex = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,12}$/;
    // const reqex = /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5,6}$)/;
    const reqex = /^((8|\+375)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/;
    // const result = reqex.test(addPhoneAndUpdateContact.phone.number);

    // const result = addPhoneAndUpdateContact.phone.number.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '')
    const result = addPhoneAndUpdateContact.phone.number.replace(/[^+\d]/g, '')
    
    console.log(addPhoneAndUpdateContact)
    // await dispatch(addPhone(addPhoneAndUpdateContact));
    // await dispatch(getCompanyByIDQuery(query));
    //  +375(sdfs)-sdf-555
    // setShowAddInputs(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
      // Разрешаем: Ctrl+A
      (event.keyCode == 65 && event.ctrlKey === true) ||
      // Разрешаем: home, end, влево, вправо
      (event.keyCode >= 35 && event.keyCode <= 39)) {
     
      // Ничего не делаем
     return;
   } else {
      // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
       event.preventDefault();
     }
  }
}

  const addOrUpdateInputsHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'phone.number':
        const number = e.target.value.replace(/\-{2,}/, '-').replace(/[^\d\.+]|\b-/, '');

        // (/\D/, '') ^\d+(\.?)\d*$//(/^\-?\d*?(\.\d+)?/,'')

        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
            number: number.replace(/[^+\d]/g, '')
          }
        }))
        break;
      case 'phone.description':
        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
            description: e.target.value
          }
        }))
        break;
      case 'phone.number.update':
        const numberUpdate = e.target.value.replace(/\-{2,}/, '-').replace(/[^\d\.+]|\b-/, '');
        // const numberUpdate = e.target.value.replace (/\D/, '');
        console.log(numberUpdate)
        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
            number: numberUpdate.replace(/[^+\d]/g, '')
          }
        }))
        break;
      case 'phone.description.update':
        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
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
      {errorPhone ? <UserErrorWarning/> : null}
      <div className="title">
        <span>Телефоны</span>
        <IoAddOutline 
          style={{cursor: 'pointer'}}
          onClick={showAddPhoneHandler}
          size={20}/>
      </div>

      {company.contactID ? company.contactID.phonesID.map(item => (
        <div key={item._id} className="data">
          {showUpdateInput.itemID === item._id ? 
            <div className="contactsblock__contacts__inputs update">
              <input 
                value={addPhoneAndUpdateContact.phone.number}
                onChange={addOrUpdateInputsHandler}
                // onKeyDown={onKeyDown}
                type="text"
                autoFocus 
                name="phone.number.update" 
                placeholder='+37544-254-56-87'/>
              <input
                value={addPhoneAndUpdateContact.phone.description}
                onChange={addOrUpdateInputsHandler}
                type="text" 
                name="phone.description.update" 
                placeholder='комментарий'/>
              <button
                className='add-btn'
                onClick={updatePhoneHandler}>
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
              <span className={item.isActive ? 'span-number active' : 'span-number'}>{validPhone(item.number)}</span>
              <span>{item.description}</span>
            </div>
          }
          {showUpdateInput.itemID === item._id ? null :
            <div className="icons">
              {item.isActive ? 
                <IoStarSharp
                onClick={() => updateIsActiveHandler(item._id, false)}
                  style={{cursor: 'pointer'}}
                  size={20}
                  color={'#ffd451'}
                />
                :
                <IoStarOutline
                  onClick={() => updateIsActiveHandler(item._id, true)}
                  style={{cursor: 'pointer'}}
                  size={20}
                />
              }
              <IoPencil 
                style={{cursor: 'pointer'}}
                onClick={() => updateShowPhoneHandler(true, item._id, item.number, item.description)}
                size={20}
                color={'#b4cb4c'}/>
              <IoTrashOutline
                onClick={() => deletePhoneHandler(item._id)}
                style={{cursor: 'pointer'}}
                size={20}
                // color={'#c02525'}
                />
            </div>
          }
        </div>
        )) : null
      }

      {showAddInputs && 
        <div className="contactsblock__contacts__inputs">
          <input 
            value={addPhoneAndUpdateContact.phone.number}
            onChange={addOrUpdateInputsHandler}
            // onKeyDown={onKeyDown}
            type="text" 
            autoFocus
            name="phone.number" 
            placeholder='+37544-254-56-87'/>
          <input
            value={addPhoneAndUpdateContact.phone.description}
            onChange={addOrUpdateInputsHandler}
            type="text" 
            name="phone.description" 
            placeholder='комментарий'/>
          <button
            className='add-btn'
            onClick={addPhoneHandler}>
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

export const ContactsPhones = React.memo(ContactsPhonesInner)