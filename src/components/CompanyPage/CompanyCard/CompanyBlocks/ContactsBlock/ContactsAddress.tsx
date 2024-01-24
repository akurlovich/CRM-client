import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { IoPencilOutline } from '@react-icons/all-files/io5/IoPencilOutline';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { updateContactByAddress } from '../../../../../store/reducers/ContactReducer/ContactActionCreators';
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { IContactUpdateByAddress } from '../../../../../types/IContact';

interface IProps {
  // title: string;
  contactID: string;
  address: string;
  district: string;
  query: ICompaniesQuery;
}

const ContactsAddressInner: FC<IProps> = ({contactID, address, district, query}) => {

  const dispatch = useAppDispatch();

  const [showUpdateInput, setShowUpdateInput] = useState(false);

  const [showAddInputs, setShowAddInputs] = useState(false);

  const [addAddressAndUpdateContact, setAddAddressAndUpdateContact] = useState<IContactUpdateByAddress>({ 
    contactID: contactID, 
    newAddress: { 
      address: {
        main: address,
        district: district,
      }
    }} as IContactUpdateByAddress);

  const showAddHandler = async () => {
    setAddAddressAndUpdateContact(prev => ({
      ...prev,
      newAddress: {
        address: {
          main: '',
          district: district,
        }
      }
    }));

    // await dispatch(getCompanyByIDQuery(query));
    setShowUpdateInput(false)
    setShowAddInputs(true);
  };

  const addAddressHandler = async () => {
    
    console.log(addAddressAndUpdateContact)
    await dispatch(updateContactByAddress(addAddressAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    
    setShowAddInputs(false);
  };

  const updateShowAddressHandler = () => {
    setShowUpdateInput(true);
    setAddAddressAndUpdateContact(prev => ({
      ...prev,
      newAddress: {
        address: {
          main: address,
          district: district,
        }
      }
    }));
    setShowAddInputs(false);
  };

  const updateAddressHandler = async () => {
    console.log(addAddressAndUpdateContact)
    await dispatch(updateContactByAddress(addAddressAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    
    setShowUpdateInput(false);
  };

  const addOrUpdateInputsHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'address.add':
        setAddAddressAndUpdateContact(prev => ({
          ...prev,
          newAddress: {
            address: {
              ...prev.newAddress.address,
              main: e.target.value,
            }
          }
        }))
        break;
      case 'address.update':
        setAddAddressAndUpdateContact(prev => ({
          ...prev,
          newAddress: {
            address: {
              ...prev.newAddress.address,
              main: e.target.value,
            }
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
        <span>Адрес</span>
        
        {!address ? 
          <IoAddOutline
            onClick={showAddHandler}
            style={{cursor: 'pointer'}} 
            size={20}/>
          : null
        }
      </div>
     
        
          {showUpdateInput ? 
            <div className="contactsblock__contacts__inputs">
              <input 
                value={addAddressAndUpdateContact.newAddress.address.main}
                onChange={addOrUpdateInputsHandler}
                className="address"
                type="text" 
                name="address.add" 
                placeholder='Область, район, населенный пункт...'/>
              <button
                className='add-btn'
                onClick={updateAddressHandler}>
                Изменить
              </button>
              <button
                className='cansel-btn'
                onClick={() => setShowUpdateInput(false)}>
                Отмена
              </button>
            </div>
           : (address ? 
              <div className="data last">
                <div className="text">
                  <span className='span-address'>{address}</span>
                </div>
                <div className="icons">
                  <IoPencilOutline 
                    onClick={updateShowAddressHandler}
                    style={{cursor: 'pointer'}}
                    size={20}/>
                </div>
              </div>
              : null
            )
          }
         
      {showAddInputs && 
        <div className="contactsblock__contacts__inputs">
          <input 
            value={addAddressAndUpdateContact.newAddress.address.main}
            onChange={addOrUpdateInputsHandler}
            className="address"
            type="text" 
            name="address.update" 
            placeholder='Область, район, населенный пункт...'/>
          <button
            className='add-btn'
            onClick={addAddressHandler}>
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

export const ContactsAddress = React.memo(ContactsAddressInner);