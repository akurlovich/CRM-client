import { IoEllipsisVerticalOutline } from '@react-icons/all-files/io5/IoEllipsisVerticalOutline';
import { IoNewspaper } from '@react-icons/all-files/io5/IoNewspaper';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllCompaniesQuery } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { ICompaniesQuery } from '../../../types/ICompany';
import { BaseBlock } from '../../BaseBlock/BaseBlock';
import { BaseBlockContacts } from '../../BaseBlock/BaseBlockContacts';
import { BaseBlockNarrow } from '../../BaseBlock/BaseBlockNarrow';
import { BaseBlockSmall } from '../../BaseBlock/BaseBlockSmall';
import { Comments } from '../../Comments/Comments';
import { AddOrder } from '../../OrdersPage/AddOrder/AddOrder';
import { OrdersInCompany } from '../../OrdersPage/OrdersInCompany/OrdersInCompany';
import './companycard.scss';

const CompanyCardInner: FC = () => {
  const { companies } = useAppSelector(state => state.companyReducer);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [showAddOrder, setShowAddOrder] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const query: ICompaniesQuery = {
          query: 
            [{
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
          find: {'_id': params.id}
        };
        await dispatch(getAllCompaniesQuery(query));
      }
    }; 
      fetchData();
  }, [])
  
  return (
    <section className="company-card">
      <header className="company-card__header">
        <div className="company-card__header__title">
          <div className="avatar">
            <IoNewspaper size={25}/>
          </div>
          <div className="title">
            {companies[0]?.title}
          </div>
          <IoStarOutline size={20} color={'#3e425e'}/>
          <IoPricetagOutline size={20} color={'#3e425e'}/>
          <IoEllipsisVerticalOutline size={20} color={'#3e425e'}/>
        </div>
        <div className="company-card__header__links">
          <span className="active">Клиент</span>
          <span>+ Сделка</span>
          <span>Процессы</span>
        </div>
      </header>
      <div className="company-card__wrapper">
        <div className="left">
          <BaseBlock company={companies[0]}/>
          <BaseBlockSmall deal="Задачи"/>
          {/* <BaseBlockSmall deal="Процесссы"/> */}
          <AddOrder isVisible={showAddOrder}/>
          {/* <AddOrder/> */}
          <OrdersInCompany showAddOrder={(() => setShowAddOrder(true))}/>
          <Comments/>
        </div>
        <div className="right">
          <BaseBlockNarrow/>
          <BaseBlockContacts/>
        </div>
      </div>
    </section>   
  )
}

export const CompanyCard = React.memo(CompanyCardInner);