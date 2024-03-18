import { IoEllipsisVerticalOutline } from '@react-icons/all-files/io5/IoEllipsisVerticalOutline';
import { IoNewspaper } from '@react-icons/all-files/io5/IoNewspaper';
import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import { IoTrashOutline } from '@react-icons/all-files/io5/IoTrashOutline';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteCompanyByID, getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery, updateCompanyTitle } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { ICompaniesQuery, ICompany } from '../../../types/ICompany';
import { BaseBlockSmall } from '../../BaseBlock/BaseBlockSmall';
import { Loader } from '../../UI/Loader/Loader';
import { ContactsBlock } from './CompanyBlocks/ContactsBlock/ContactsBlock';
import { DealsBlock } from './CompanyBlocks/DealsBlock/DealsBlock';
import './companycard.scss';
import { getAllDealTitles } from '../../../store/reducers/DealReducer/DealActionCreators';
import { addQueryToState } from '../../../store/reducers/CompanyReducer/CompanySlice';
import { InfoBlock } from './CompanyBlocks/InfoBlock/InfoBlock';
import { CommentsBlock } from './CompanyBlocks/CommentsBlock/CommentsBlock';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { AddOrder } from './CompanyBlocks/OrderBlock/AddOrder/AddOrder';
import { OrdersInCompany } from './CompanyBlocks/OrderBlock/OrdersInCompany/OrdersInCompany';
import { EditOrder } from './CompanyBlocks/OrderBlock/EditOrder/EditOrder';
import { addItemProduct, clearItemsProduct, setShowEditOrder, setShowNewOrder } from '../../../store/reducers/OrderReducer/OrderSlice';
import { UserErrorWarning } from '../../UI/UserErrorWarning/UserErrorWarning';
import { getAllUsers } from '../../../store/reducers/UserReducer/UserActionCreators';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
  weekStart: 1,
  months: [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ]
});

// interface IProps {
//   item: ICompany;
// };

//TODO при нажатии Добавить сделку, очистить в orderReducer order, orderForEdit

const CompanyCardInner: FC = () => {
  const { company, companies, isLoading, companyFirstUser, error: errorCompany, query  } = useAppSelector(state => state.companyReducer);
  const { isShowEditOrder, isShowNewOrder } = useAppSelector(state => state.orderReducer);
  const { user } = useAppSelector(state => state.authReducer);
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
  const [showAddOrderSmall, setShowAddOrderSmall] = useState<boolean>(true);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(company.title)

  const showAddOrderHandler = () => {
    dispatch(setShowNewOrder(false))
    setShowAddOrderSmall(true);

    dispatch(clearItemsProduct(company._id))
  };

  const showAddOrderSmallHandler = () => {
    dispatch(setShowNewOrder(true))
    setShowAddOrderSmall(false);
  };

  const changeTitleHandler = async () => {
    // console.log(title)
    setEditTitle(false)
    await dispatch(updateCompanyTitle({companyID: company._id, title: title}))
    await dispatch(getCompanyByIDQuery(query));
  }

  const deleteCompanyHandler = async () => {
    if (window.confirm(`Удалить компанию ${company.title}?`)) {
      await dispatch(deleteCompanyByID(company._id))
//TODO  ---  обработать ошибку, если вдруг компания не удалилась
      navigate('/companies')
    }
  };

  useEffect(() => {
    // const foundLocat = localStorage.getItem(company._id);
    // if (foundLocat) {
    //   const localItems = JSON.parse(foundLocat)
    //   console.log('first', localItems)
    // }

    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      if (params.id) {
        const query: ICompaniesQuery = {
          query: 
            [
              {
                path: "usersID", 
                // select: "lastname firstname"
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
              },
              {
                path: "dealsID", 
                populate: { path: 'dealTitleID' }
              },
              {
                path: "dealsID", 
                populate: { path: 'userID' }
              },
              {
                path: "commentsID", 
                populate: { path: 'userID' }
              },
              {
                path: "ordersID", 
                populate: { path: 'usersID' }
              },
              {
                path: "ordersID", 
                populate: { path: 'companyID' }
              },
              {
                path: "ordersID", 
                //@ts-ignore
                populate: { path: 'orderItemID', populate: { path: "productID"} }
              },
            ], 
          sort: {'contactID.address.district': 'asc'}, 
          limit: 0,
          find: {'_id': params.id}
        };
        await dispatch(getCompanyByIDQuery(query));
        await dispatch(getAllDealTitles());
        await dispatch(getAllUsers());
        dispatch(addQueryToState(query));
        // await dispatch(getAllPhones());
        // await dispatch(getCompanyByID(params.id));
      }
    }; 

    try {
      if (isMounted) {
        fetchData();
      }
    } catch (error) {
      console.log(error)
    }

    return () => {
      isMounted = false;
      controller.abort();
      dispatch(setShowNewOrder(false));
      dispatch(setShowEditOrder(false));
    }
  }, []);

  // useEffect(() => {
  //   if (params.id) {
  //     // console.log(params.id)
  //     const foundLocat = localStorage.getItem(params.id);
  //     if (foundLocat) {
  //       const localItems = JSON.parse(foundLocat)
  //       // console.log(localItems)
  //       dispatch(setShowEditOrder(false));
  //       dispatch(setShowNewOrder(true));
  //       setShowAddOrderSmall(false);
  
  //       for (let data of localItems.items) {
  //         // const newID = uuidv4();
  //         dispatch(addItemProduct({
  //           companyID: data.companyID,
  //           itemID: data.itemID,
  //           productID: data.productID, 
  //           price: data.price, 
  //           count: data.count, 
  //           sum: data.sum,
  //           productTitle: data.productTitle,
  //           productDimension: data.productDimension,
  //           vatSum: 0,
  //           totalSum: 0,
  //         }))
  //       }
  //     }

  //   }
  // }, [])

  useEffect(() => {
    if (company.title) {
      document.title = company.title;
      setTitle(company.title)
    }

    return () => {
      document.title = 'CRM-Skrama-24';
    }
  }, [company])
  
  
  return (
    <>
      {errorCompany ? <UserErrorWarning /> : null}
      {isLoading ? <Loader/> : 
        <section className="company-card">
          <header className="company-card__header">
            <div className="company-card__header__title">
              <div className="avatar">
                <IoNewspaper size={25}/>
              </div>
              <div className="title">
                {editTitle ? 
                  <>
                    <input 
                    value={title}
                    onChange={(e: React.FocusEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    type="text"
                    autoFocus/>
                    <button
                      className='add-btn'
                      onClick={changeTitleHandler}
                      >
                      Изменить
                    </button>
                    <button
                      className='cansel-btn'
                      onClick={() => setEditTitle(false)}>
                      Отмена
                    </button>
                  </>
                  : 
                  <span>{company.title}</span>
                }
                
              </div>
              {editTitle ? null :
                <IoCreateOutline 
                  onClick={() => setEditTitle(true)}
                  style={{'cursor': 'pointer'}}
                  size={20} color={'#3e425e'}/>
              }
              <IoStarOutline size={20} color={'#3e425e'}/>
              {/* <IoPricetagOutline size={20} color={'#3e425e'}/> */}
              {user.isAdmin ? 
                <IoTrashOutline
                  onClick={deleteCompanyHandler}
                  style={{'cursor': 'pointer'}}
                  size={20} color={'#3e425e'}/>
                : null
              }
            </div>
            <div
              // onClick={() => console.log(companyItem)}
              className="company-card__header__links">
              <span className="active">Клиент</span>
              <span
                style={{'cursor': 'pointer'}}
                onClick={showAddOrderSmallHandler}
                >+ Сделка</span>
              <span>Процессы</span>
            </div>
          </header>
          <div className="company-card__wrapper">
            <div className="left">
              <InfoBlock/>
              {companyFirstUser ? (company.usersID?.some(item => item._id === user.id) ?
                <>
                  <BaseBlockSmall deal="Добавить сделку" isVisible={showAddOrderSmall} showAddOrder={showAddOrderSmallHandler}/>
                  <AddOrder isVisible={isShowNewOrder} showAddOrder={showAddOrderHandler}/>
                  <EditOrder isVisible={isShowEditOrder}/>
                  {/* <AddOrder/> */}
                  <OrdersInCompany showAddOrder={(() => dispatch(setShowNewOrder(true)))}/>
                  <CommentsBlock/>
                </>
                : user.isAdmin ?
                  <>
                    <BaseBlockSmall deal="Добавить сделку" isVisible={showAddOrderSmall} showAddOrder={showAddOrderSmallHandler}/>
                    <AddOrder isVisible={isShowNewOrder} showAddOrder={showAddOrderHandler}/>
                    <EditOrder isVisible={isShowEditOrder}/>
                    {/* <AddOrder/> */}
                    <OrdersInCompany showAddOrder={(() => dispatch(setShowNewOrder(true)))}/>
                    <CommentsBlock/>
                  </>
                  : null)
                  : (user.isAdmin ?
                    <>
                      <BaseBlockSmall deal="Добавить сделку" isVisible={showAddOrderSmall} showAddOrder={showAddOrderSmallHandler}/>
                      <AddOrder isVisible={isShowNewOrder} showAddOrder={showAddOrderHandler}/>
                      <EditOrder isVisible={isShowEditOrder}/>
                      {/* <AddOrder/> */}
                      <OrdersInCompany showAddOrder={(() => dispatch(setShowNewOrder(true)))}/>
                      <CommentsBlock/>
                    </> : null)
              }
            </div>
            <div className="right">
              {companyFirstUser ? (company.usersID?.some(item => item._id === user.id) ?
                <>
                  <DealsBlock/>
                  <ContactsBlock/>
                </>
                : user.isAdmin ?
                <>
                  <DealsBlock/>
                  <ContactsBlock/>
                </>
                : null)
                : (
                  user.isAdmin ?
                  <>
                    <DealsBlock/>
                    <ContactsBlock/>
                  </>
                : null
                )
              }
              
            </div>
          </div>
        </section>   
      }
    </>
  )
}

export const CompanyCard = React.memo(CompanyCardInner);