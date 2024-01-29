import { IoEllipsisVerticalOutline } from '@react-icons/all-files/io5/IoEllipsisVerticalOutline';
import { IoNewspaper } from '@react-icons/all-files/io5/IoNewspaper';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
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

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
  weekStart: 1,
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

// interface IProps {
//   item: ICompany;
// };

const CompanyCardInner: FC = () => {
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
  const [showAddOrderSmall, setShowAddOrderSmall] = useState<boolean>(true);
  // const [companyItem, setCompanyItem] = useState<ICompany>({} as ICompany);
  // const [userItem, setUserItem] = useState({});

  const showAddOrderHandler = () => {
    setShowAddOrder(false);
    setShowAddOrderSmall(true);
  };

  const showAddOrderSmallHandler = () => {
    setShowAddOrder(true);
    setShowAddOrderSmall(false);
  };

  useEffect(() => {
    // console.log('param', params.id)
    const fetchData = async () => {
      if (params.id) {
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
            ], 
          sort: {'contactID.address.district': 'asc'}, 
          limit: 0,
          find: {'_id': params.id}
        };
        await dispatch(getCompanyByIDQuery(query));
        await dispatch(getAllDealTitles());
        dispatch(addQueryToState(query));
        // await dispatch(getAllPhones());
        // await dispatch(getCompanyByID(params.id));
      }
    }; 
    fetchData();
  }, []);
  
  return (
    <>
      {isLoading ? <Loader/> : 
        <section className="company-card">
          <header className="company-card__header">
            <div className="company-card__header__title">
              <div className="avatar">
                <IoNewspaper size={25}/>
              </div>
              <div className="title">
                {company.title}
              </div>
              <IoStarOutline size={20} color={'#3e425e'}/>
              <IoPricetagOutline size={20} color={'#3e425e'}/>
              <IoEllipsisVerticalOutline size={20} color={'#3e425e'}/>
            </div>
            <div
              // onClick={() => console.log(companyItem)}
              className="company-card__header__links">
              <span className="active">Клиент</span>
              <span>+ Сделка</span>
              <span>Процессы</span>
            </div>
          </header>
          <div className="company-card__wrapper">
            <div className="left">
              <InfoBlock/>
              <BaseBlockSmall deal="Добавить сделку" isVisible={showAddOrderSmall} showAddOrder={showAddOrderSmallHandler}/>
              {/* <BaseBlockSmall deal="Процесссы"/> */}
              {/* <AddOrder isVisible={showAddOrder} showAddOrder={(() => setShowAddOrder(false))}/> */}
              <AddOrder isVisible={showAddOrder} showAddOrder={showAddOrderHandler}/>
              {/* <AddOrder/> */}
              <OrdersInCompany showAddOrder={(() => setShowAddOrder(true))}/>
              <CommentsBlock/>
            </div>
            <div className="right">
              <DealsBlock/>
              {/* <ContactsBlock companyID={params.id ? params.id : ''}/> */}
              <ContactsBlock/>
              
            </div>
          </div>
        </section>   
      }
    </>
  )
}

export const CompanyCard = React.memo(CompanyCardInner);