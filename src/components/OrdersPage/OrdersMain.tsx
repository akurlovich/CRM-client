import React, { FC, useEffect, useState } from 'react';
import './ordersmain.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICompaniesQuery } from '../../types/ICompany';
import { getAllOrders } from '../../store/reducers/OrderReducer/OrderActionCreater';
import { OrderUnit } from '../CompanyPage/CompanyCard/CompanyBlocks/OrderBlock/OrdersInCompany/OrderUnit';
// import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";

const OrdersMainInner: FC = () => {
  const { ordersAll } = useAppSelector(state => state.orderReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
     
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
        find: {'_id': ''}
      };
      // await dispatch(getCompanyByIDQuery(query));
  //TODO --  надо userID брать из reducer, когда пользователь будет залогинен, а также если он АДМИН, если не админ, пустая строка
      await dispatch(getAllOrders(''));
      // await dispatch(getAllDealTitles());
      // dispatch(addQueryToState(query));
      // await dispatch(getAllPhones());
      // await dispatch(getCompanyByID(params.id));
    }
    fetchData();
  }, []);

  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <>
      {/* <AddCompany isVisible={isModal} onClose={() => setIsModal(false)}/> */}
      <section className='orders'>
        <div className="orders__filters">
          filter
        </div>
        <div className="orders__container">
          <div className="orders__header">
            <div className="orders__header__title">
              <div className="title">
                <span
                  onClick={() => console.log(ordersAll)}
                  >Мои сделки</span>
              </div>
              <div className="icons">
                <IoDocumentOutline size={25}/>
                <IoExitOutline size={25}/>
                <IoFilterOutline size={25}/>
              </div>
            </div>
            <button 
              onClick={() => setIsModal(true)}
              className="orders__header__btn">
              Добавить сделку
            </button>
          </div>
          <div className="orders__main">
            <div className="orders__main__row first_row">
              {/* <IoDuplicateOutline width={30}/> */}
              <span className='cell first'><IoDocumentOutline width={50}/></span>
              <span className='cell'>Клиент</span>
              <span className='cell total'>Сумма</span>
              <span className='cell tight'>Ответственный</span>
              <span className='cell narrow'>Дата создания</span>
            </div>

            {ordersAll ?
              ordersAll.map(item => 
                <OrderUnit 
                  key={item._id}
                  item={item}
                  ordersPage={true}/>
                // <div className="orders__main__row">
                //   <IoSquareOutline width={25}/>
                //   <span className='cell data count'>{item.orderNumber}</span>
                //   <span className='cell data'>{item.companyID.title}</span>
                //   <span className='cell data total'>{`${item.totalSum} руб`}</span>
                //   <div className='cell data user'>
                //     <span>{`${item.usersID.firstname[0]}${item.usersID.lastname[0]}`}</span>
                //     <span>{`${item.usersID.firstname} ${item.usersID.lastname}`}</span>
                //   </div>
                //   <span className='cell data'>05 октябрь 2023г.</span>
                  
                // </div>
            
              ) : 

              <span>Сделок нет.</span>

            }


            {/* <div className="orders__main__row">
              <IoSquareOutline width={25}/>
              <span className='cell data'>ОАО Строительный трест номер 212 Дрогичин</span>
              <div className='cell data user'>
                <span>ВА</span>
                <span>Васьков Евгений</span>
              </div>
              <span className='cell data'>05 сентября 2023г.</span>
              <span className='cell data'>31 мая 2024г.</span>
              <span className='cell data'>Малоритский</span>
            </div> */}
            <div className="orders__main__items">

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export const OrdersMain = React.memo(OrdersMainInner);