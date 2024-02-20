import React, { FC, useEffect, useState } from 'react';
import './infoblock.scss';
import { IoPencil } from "@react-icons/all-files/io5/IoPencil";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { IoPersonAdd } from "@react-icons/all-files/io5/IoPersonAdd";
import { IoTrash } from "@react-icons/all-files/io5/IoTrash";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import DealCreate from '../DealsBlock/DealCreate';
import { DealItem } from '../DealsBlock/DealItem';
import { getCompanyByIDQuery, updateCompanyDescription } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { USER_BG_COLORS } from '../../../../../constants/user';
import { randomBGColor } from '../../../../../services/ClientServices/RandomBGColor';
import { IUser } from '../../../../../types/IUser';

const InfoBlockInner: FC = () => {
  const { company, companyFirstUser, companyDeals, query } = useAppSelector(state => state.companyReducer);
  const { users } = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(true);
  const [companyDescription, setCompanyDescription] = useState<string>(company.description);
  const [showUsers, setShowUsers] = useState(false);
  const [usersArray, setUsersArray] = useState<IUser[]>([] as IUser[]);
  const [usersFilter, setUsersFilter] = useState<IUser[]>([] as IUser[]);
  const [showUsersInfo, setShowUsersInfo] = useState(false);

  const userHandler = async (user: IUser) => {
    // console.log(usersArray);
    setShowUsers(false);
    setUsersArray(prev => [...prev, user])
    const filtered = usersFilter.filter((item) => item._id !== user._id);
      // console.log('first', filtered)
    setUsersFilter([...filtered])
  };

  const addOrUpdateDescription = async () => {
    await dispatch(updateCompanyDescription({companyID: company._id, description: companyDescription}));
    await dispatch(getCompanyByIDQuery(query));
    setShowAddDescription(true);
  };

  const deleteUserHandler = async (user: IUser) => {
    setUsersArray([...usersArray.filter((item) => item._id !== user._id)])
    setUsersFilter(prev => [...prev, user])
  };

  const closeHandler = () => {
    setShowUsers(false);
    setShowUsersInfo(false);
  };

  useEffect(() => {
    if (company.usersID?.length) {
      setUsersArray([...company.usersID]);
      const filtered = users.filter((item) => item._id !== companyFirstUser._id);
      // console.log('first', filtered)
      setUsersFilter([...filtered])
    }
  }, [company, users]);
  
  return (
    <section className='info-block'>
      <div className="info-block__title">
        <div className="info-block__title__user">
          {(usersArray.length === 1) ? 
            (usersArray.map(item => 
            <div key={item._id} className="info-block__title__user__item">
              <div 
                style={{'backgroundColor': `${USER_BG_COLORS[randomBGColor()]}`}}
                className="avatar">{item.lastname?.[0] + item.firstname?.[0]}</div>
              <div 
                onClick={() => setShowUsersInfo(true)}
                className="name">
                <span>{item.lastname + ' ' + item.firstname}</span>
                <span>Ответственный</span>
              </div>
              
            </div>
            ))
            : null
          }
          {(usersArray.length > 1) ? 
            (usersArray.map(item => 
              <div 
                onClick={() => setShowUsers(true)}
                key={item._id} 
                className="info-block__title__user__item">
                <div 
                  style={{'backgroundColor': `${USER_BG_COLORS[randomBGColor()]}`}}
                  className="avatar">
                    {item.lastname?.[0] + item.firstname?.[0]}
                </div>
              </div>
            ))
            : null
          }

          {(usersArray.length === 0) ? 
            <div 
              onClick={() => setShowUsersInfo(true)}
              className="info-block__title__user__item">
                <span>Ответственных нет</span>
            </div>
            : null
          }

          {showUsersInfo ? 
            <div className='info-block__title__user__list'>
              <IoCloseOutline
                className='close'
                onClick={closeHandler}
                size={20}
              />
              <ul>
                {usersArray.map(item => 
                  <li key={item._id}
                    // onClick={() => userHandler(item)}
                    >
                    <div 
                      style={{'backgroundColor': `${USER_BG_COLORS[randomBGColor()]}`}}
                      className="avatar">{item?.lastname?.[0] + item?.firstname?.[0]}</div>
                    <div className="name">
                      <span>{item?.lastname + ' ' + item?.firstname}</span>
                    </div>
                    <IoTrash 
                      onClick={() => deleteUserHandler(item)}
                      style={{'cursor': 'pointer'}}
                      size={15}/>
                  </li>
                )}

              </ul>
              <div className="info-block__title__user__list__add">
                <IoPersonAdd 
                  style={{'color': 'grey'}}
                  size={20}/>
                <span
                  onClick={() => setShowUsers(true)}
                  >
                  Добавить ответственного</span>
                {showUsers ? 
                  <ul className='info-block__title__user__list__add__users'>
                    {usersFilter.map(item => 
                      <li key={item._id}
                        onClick={() => userHandler(item)}
                        >
                        <div 
                          style={{'backgroundColor': `${USER_BG_COLORS[randomBGColor()]}`}}
                          className="avatar">{item?.lastname?.[0] + item?.firstname?.[0]}</div>
                        <div className="name">
                          <span>{item?.lastname + ' ' + item?.firstname}</span>
                        </div>
                      </li>
                    )}
                  </ul>
                  : null
                }
              </div>
            </div>
            : null
          }

          {/* <SelectUsers items={users} responsibleUsers={company.usersID}/> */}
        </div>
        <DealItem item={companyDeals[0]} fromBlock={true}/>
        <div className="info-block__title__nitification">
          {showAddDeal && 
            <DealCreate onAction={() => setShowAddDeal(false)} position='infoblock'/>
          }
          <span
            style={{'cursor': 'pointer'}}
            onClick={() => setShowAddDeal(true)}>
            + Дело</span>
        </div>
      </div>
      <div className="info-block__description">
        {showAddDescription ? 
          <>
            <span>{company.description ? company.description : 'Введите описание компании'}</span>
            <IoPencil 
              style={{cursor: 'pointer'}}
              onClick={() => {
                setShowAddDescription(false);
                setCompanyDescription(company.description)        
                }
              }
              size={20}
              color={'#b4cb4c'}/>
          </>
          :
          <div className="contactsblock__contacts__inputs ">
            <textarea 
              value={companyDescription}
              onChange={(e: React.FocusEvent<HTMLTextAreaElement>) => setCompanyDescription(e.target.value)}
              autoFocus
              placeholder='Введите описание компании...'/>
            <div className="buttons">
              <button
                className='add-btn'
                onClick={addOrUpdateDescription}
                >
                Добавить
              </button>
              <button
                className='cansel-btn'
                onClick={() => setShowAddDescription(true)}
                >
                Отмена
              </button>

            </div>
          </div>
        }
      </div>
    </section>
  )
}

export const InfoBlock = React.memo(InfoBlockInner);