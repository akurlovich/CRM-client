import React, { FC, useState } from 'react';
import './contactsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoCopyOutline } from '@react-icons/all-files/io5/IoCopyOutline';
import { IoTrashOutline } from "@react-icons/all-files/io5/IoTrashOutline";
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { IPhoneNewAddContacts } from '../../../../../types/IPhone';
import { IEmailNewAddContacts } from '../../../../../types/IEmail';
import { addPhone, updatePhoneByID } from '../../../../../store/reducers/PhoneReducer/PhoneActionCreators';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { addEmail, updateEmailByID } from '../../../../../store/reducers/EmailReducer/EmailActionCreators';
import { deleteEmailFromContactByPhoneID, deletePhoneFromContactByPhoneID } from '../../../../../store/reducers/ContactReducer/ContactActionCreators';
import { ContactsPhones } from './ContactsPhones';

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

  //!------del
  const [showUpdateInput, setShowUpdateInput] = useState({show: false, itemID: ''})

  //!---------del
  const [addPhoneAndUpdateContact, setAddPhoneAndUpdateContact] = useState<IPhoneNewAddContacts>({ contactID: company.contactID?._id, 
    phone: { 
      companyID: company._id, 
      number: '', 
      description: ''
    }} as IPhoneNewAddContacts);

  const [addEmailAndUpdateContact, setAddEmailAndUpdateContact] = useState<IEmailNewAddContacts>({ contactID: company.contactID?._id, 
    email: { 
      companyID: company._id, 
      email: '', 
      description: ''
    }} as IEmailNewAddContacts);

  const [showAddPhoneOrEmail, setShowAddPhoneOrEmail] = useState({phone: false, email: false});

  //!---  del
  const addPhoneOrEmailInputsHandler = (e: React.FocusEvent<HTMLInputElement>) => {
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

  //!---- del
  const addPhoneHandler = async () => {
    // const reqex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,12}(\s*)?$/;
    // const reqex = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,12}$/;
    // const reqex = /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5,6}$)/;
    const reqex = /^((8|\+375)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/;

    const result = reqex.test(addPhoneAndUpdateContact.phone.number);
    // console.log(result)
    // console.log(addPhoneAndUpdateContact)
    await dispatch(addPhone(addPhoneAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    // await dispatch(getAllPhones());
    
    setShowAddPhoneOrEmail(prev => ({...prev, phone: false}));
  };

  const addEmailHandler = async () => {
    const reqex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const result = reqex.test(addEmailAndUpdateContact.email.email);
    // console.log(result)
    console.log(addEmailAndUpdateContact)
    await dispatch(addEmail(addEmailAndUpdateContact));
    await dispatch(getCompanyByIDQuery(query));
    setShowAddPhoneOrEmail(prev => ({...prev, email: false}));
  }

  //!----del
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

  const updateEmailHandler = async () => {
    const email = {
      emailID: showUpdateInput.itemID, 
      email: {
        email: addEmailAndUpdateContact.email.email, 
        description: addEmailAndUpdateContact.email.description
    }};

    // // console.log(phone)
    
    await dispatch(updateEmailByID(email));
    await dispatch(getCompanyByIDQuery(query));
    // await dispatch(getAllPhones());
    setShowUpdateInput({show: false, itemID: ''});
  };

  //!---del
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
    setShowAddPhoneOrEmail(prev => ({...prev, phone: false}));
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
    setShowAddPhoneOrEmail(prev => ({...prev, email: false}));
  };

  // const showAddPhoneHandler = () => {
  //   setAddPhoneAndUpdateContact(prev => ({
  //     ...prev,
  //     phone : {
  //       ...prev.phone,
  //       number: '',
  //       description: '',
  //     }
  //   }))
  //   setShowUpdateInput({show: false, itemID: ''})
  //   setShowAddPhoneOrEmail(prev => ({...prev, phone: true}));
  // };

  const showAddEmailHandler = () => {
    setShowUpdateInput({show: false, itemID: ''})
    setAddEmailAndUpdateContact(prev => ({
      ...prev,
      email : {
        ...prev.email,
        email: '',
        description: '',
      }
    }))
    setShowAddPhoneOrEmail(prev => ({...prev, email: true}));
  };

  //!-- del
  const deletePhoneHandler = async (id: string) => {
    if (window.confirm("Удалить контакт?")) {
      await dispatch(deletePhoneFromContactByPhoneID(id));
      await dispatch(getCompanyByIDQuery(query));
    }
  };

  const deleteEmailHandler = async (id: string) => {
    if (window.confirm("Удалить почту?")) {
      await dispatch(deleteEmailFromContactByPhoneID(id));
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
            <ContactsPhones items={company.contactID && company.contactID.phonesID} query={query}/>
            {/* <div className="title">
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
                      onChange={addPhoneOrEmailInputsHandler}
                      type="text" 
                      name="phone.number.update" 
                      placeholder='+37544-254-56-87'/>
                    <input
                      value={addPhoneAndUpdateContact.phone.description}
                      onChange={addPhoneOrEmailInputsHandler}
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
                      onClick={() => updateShowPhoneHandler(true, item._id, item.number, item.description)}
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

            {showAddPhoneOrEmail.phone && 
              <div className="contactsblock__contacts__inputs">
                <input 
                  value={addPhoneAndUpdateContact.phone.number}
                  onChange={addPhoneOrEmailInputsHandler}
                  type="text" 
                  name="phone.number" 
                  placeholder='+37544-254-56-87'/>
                <input
                  value={addPhoneAndUpdateContact.phone.description}
                  onChange={addPhoneOrEmailInputsHandler}
                  type="text" 
                  name="phone.description" 
                  placeholder='комментарий'/>
                <button
                  onClick={addPhoneHandler}>
                  Добавить
                </button>
                <button
                  onClick={() => setShowAddPhoneOrEmail(prev => ({...prev, phone: false}))}>
                  Отмена
                </button>
              </div>
            } */}

        
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
                {/* <IoTrashOutline
                  style={{cursor: 'pointer'}}
                  size={20}/> */}
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
                {/* <IoTrashOutline
                  style={{cursor: 'pointer'}}
                  size={20}/> */}
              </div>
            </div>
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
                      onChange={addPhoneOrEmailInputsHandler}
                      type="text" 
                      name="email.email.update" 
                      placeholder='+37544-254-56-87'/>
                    <input
                      value={addEmailAndUpdateContact.email.description}
                      onChange={addPhoneOrEmailInputsHandler}
                      type="text" 
                      name="email.description.update" 
                      placeholder='комментарий'/>
                    <button
                      onClick={updateEmailHandler}>
                      Изменить
                    </button>
                    <button
                      onClick={() => setShowUpdateInput({show: false, itemID: ''})}>
                      Отмена
                    </button>
                  </div>
                  :
                  <div className="text">
                    <span className='span-number'>{item.email}</span>
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

            {showAddPhoneOrEmail.email && 
              <div className="contactsblock__contacts__inputs">
                <input 
                  value={addEmailAndUpdateContact.email.email}
                  onChange={addPhoneOrEmailInputsHandler}
                  type="text" 
                  name="email.email" 
                  placeholder='exapmle@tut.by'/>
                <input
                  value={addEmailAndUpdateContact.email.description}
                  onChange={addPhoneOrEmailInputsHandler}
                  type="text" 
                  name="email.description" 
                  placeholder='комментарий'/>
                <button
                  onClick={addEmailHandler}>
                  Добавить
                </button>
                <button
                  onClick={() => setShowAddPhoneOrEmail(prev => ({...prev, email: false}))}>
                  Отмена
                </button>
              </div>
            }

          </div>
        </div>
      </div>
    </section>
  )
};

export const ContactsBlock = React.memo(ContactsBlockInner);