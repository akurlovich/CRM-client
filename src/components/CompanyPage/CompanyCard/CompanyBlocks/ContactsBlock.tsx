import React, { FC, useState } from 'react';
import './contactsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoCopyOutline } from '@react-icons/all-files/io5/IoCopyOutline';
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
import { ICompaniesQuery, ICompany } from '../../../../types/ICompany';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IPhoneNewAddContacts } from '../../../../types/IPhone';
import { addPhone, getAllPhones, updatePhoneByID } from '../../../../store/reducers/PhoneReducer/PhoneActionCreators';
import { deletePhoneFromContactByPhoneID } from '../../../../store/reducers/ContactReducer/ContactActionCreators';
import { getCompanyByIDQuery } from '../../../../store/reducers/CompanyReducer/CompanyActionCreaters';

interface IProps {
  companyID: string;
}

const ContactsBlockInner: FC<IProps> = ({companyID}) => {
  const query: ICompaniesQuery = {
    query: 
      [
        {
          path: "usersID", 
          select: "lastname firstname"
        },
        {
          path: "contactID", 
          // select: "address.district"
        },
        {
          path: "contactID", 
          populate: { path: 'phonesID' }
        },
        {
          path: "contactID", 
          populate: { path: 'emailsID' }
        }
      ], 
    sort: {'contactID.address.district': 'asc'}, 
    limit: 0,
    find: {'_id': companyID}
  };
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);
  const { phones } = useAppSelector(state => state.phoneReducer);

  const dispatch = useAppDispatch();

  const [showUpdateInput, setShowUpdateInput] = useState({show: false, itemID: ''})

  const [addPhoneAndUpdateContact, setAddPhoneAndUpdateContact] = useState<IPhoneNewAddContacts>({ contactID: company.contactID?._id, 
    phone: { 
      companyID: company._id, 
      number: '', 
      description: ''
    }} as IPhoneNewAddContacts);

  const [showAddPhone, setShowAddPhone] = useState(false);

  const addPhoneInputsHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'phone.number':
        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
            number: e.target.value
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
        setAddPhoneAndUpdateContact(prev => ({
          ...prev,
          phone : {
            ...prev.phone,
            number: e.target.value
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

  const addPhoneHandler = async () => {
    // const reqex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,12}(\s*)?$/;
    // const reqex = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,12}$/;
    // const reqex = /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5,6}$)/;
    const reqex = /^((8|\+375)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/;

    const result = reqex.test(addPhoneAndUpdateContact.phone.number);
    // console.log(result)
    console.log(addPhoneAndUpdateContact)
    await dispatch(addPhone(addPhoneAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    // await dispatch(getAllPhones());
    
    // setShowAddPhone(false);
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
    // await dispatch(getAllPhones());
    setShowUpdateInput({show: false, itemID: ''});
  };

  const updateShowHandler = (show: boolean, itemID: string, number: string, description: string) => {
    setShowUpdateInput({show: show, itemID: itemID});
    setAddPhoneAndUpdateContact(prev => ({
      ...prev,
      phone : {
        ...prev.phone,
        number: number,
        description: description,
      }
    }))

  };

  const showAddPhoneHandler = () => {
    setAddPhoneAndUpdateContact(prev => ({
      ...prev,
      phone : {
        ...prev.phone,
        number: '',
        description: '',
      }
    }))
    setShowAddPhone(true);
  };

  const deletePhoneHandler = async (id: string) => {
    if (window.confirm("Удалить контакт?")) {
      await dispatch(deletePhoneFromContactByPhoneID(id));
      await dispatch(getCompanyByIDQuery(query));
    }
  };

  return (
    <section className='contactsblock'>
      <div className="baseblockSmall__newdeal">
        <div className="baseblockSmall__newdeal__title">
          <div className="text">
            <span>Контактные данные</span>
          </div>
          <div className="icons">
            <IoAddCircleOutline 
              style={{cursor: 'pointer'}}
              onClick={() => console.log(phones)}
              size={20}/>
          </div>
        </div>
      </div>
      <div className="baseblockSmall__deals">
        <div className="baseblockSmall__deals__item">
          <div className="contactsblock__contacts">
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
                      onChange={addPhoneInputsHandler}
                      type="text" 
                      name="phone.number.update" 
                      placeholder='+37544-254-56-87'/>
                    <input
                      value={addPhoneAndUpdateContact.phone.description}
                      onChange={addPhoneInputsHandler}
                      type="text" 
                      name="phone.description.update" 
                      placeholder='комментарий'/>
                    <button
                      onClick={updatePhoneHandler}>
                      Изменить
                    </button>
                    <button
                      onClick={() => setShowUpdateInput({show: false, itemID: ''})}>
                      Отмена
                    </button>
                  </div>
                  :
                  <div className="text">
                    <span className='span-number'>{item.number}</span>
                    <span>{item.description}</span>
                  </div>
                }
                {showUpdateInput.itemID === item._id ? null :
                  <div className="icons">
                    <IoPencilOutline 
                      style={{cursor: 'pointer'}}
                      onClick={() => updateShowHandler(true, item._id, item.number, item.description)}
                      size={20}/>
                    <IoTrashOutline
                      onClick={() => deletePhoneHandler(item._id)}
                      style={{cursor: 'pointer'}}
                      size={20}/>
                  </div>
                }
              </div>
              )) : null
            }

            {showAddPhone && 
              <div className="contactsblock__contacts__inputs">
                <input 
                  value={addPhoneAndUpdateContact.phone.number}
                  onChange={addPhoneInputsHandler}
                  type="text" 
                  name="phone.number" 
                  placeholder='+37544-254-56-87'/>
                <input
                  value={addPhoneAndUpdateContact.phone.description}
                  onChange={addPhoneInputsHandler}
                  type="text" 
                  name="phone.description" 
                  placeholder='комментарий'/>
                <button
                  onClick={addPhoneHandler}>
                  Добавить
                </button>
                <button
                  onClick={() => setShowAddPhone(false)}>
                  Отмена
                </button>
              </div>
            }

        
            <div className="title">
              <span>Адрес</span>
              <IoAddOutline
                style={{cursor: 'pointer'}} 
                size={20}/>
            </div>
            <div className="data last">
              <div className="text">
                <span className='span-address'>{company?.contactID?.address?.main ? company?.contactID?.address?.main : ''}</span>
              </div>
              <div className="icons">
                <IoPencilOutline 
                  style={{cursor: 'pointer'}}
                  size={20}/>
                <IoTrashOutline
                  style={{cursor: 'pointer'}}
                  size={20}/>
              </div>
            </div>

            <div className="title">
              <span>Район</span>
              <IoAddOutline 
                style={{cursor: 'pointer'}}
                size={20}/>
            </div>
            <div className="data last">
              <div className="text">
                <span>{company?.contactID?.address?.district ? company?.contactID?.address?.district : ''}</span>
              </div>
              <div className="icons">
                <IoPencilOutline 
                  style={{cursor: 'pointer'}}
                  size={20}/>
                <IoTrashOutline
                  style={{cursor: 'pointer'}}
                  size={20}/>
              </div>
            </div>
            <div className="title">
              <span>Почта</span>
              <IoAddOutline size={20}/>
            </div>

            {company.contactID ? company.contactID.emailsID.map(item => (
              <div key={item._id} className="data">
                <div className="text">
                  <span>{company?.contactID?.emailsID[0]?.email ? company?.contactID?.emailsID[0]?.email : ''}</span>
                  <span>{company?.contactID?.emailsID[0]?.description ? company?.contactID?.emailsID[0]?.description : ''}</span>
                </div>
                <div className="icons">
                  <IoPencilOutline 
                    style={{cursor: 'pointer'}}
                    size={20}/>
                  <IoTrashOutline
                    style={{cursor: 'pointer'}}
                    size={20}/>
                </div>
              </div>

              )) : null
            }

          </div>
        </div>
      </div>
    </section>
  )
};

export const ContactsBlock = React.memo(ContactsBlockInner);