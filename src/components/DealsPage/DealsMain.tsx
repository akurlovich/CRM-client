import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCompanyByIDQuery } from '../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllDeals } from '../../store/reducers/DealReducer/DealActionCreators';
import { ICompaniesQuery } from '../../types/ICompany';
import { IDeal } from '../../types/IDeal';
import CalendarBig from '../UI/Calendar/CalendarBig';

import DealForDay from './DealsForDay/DealForDay';
import './dealsmain.scss'

const DealsMainInner: FC = () => {
  const { deals, dealsWithQuery } = useAppSelector(state => state.dealReducer);
  const dispatch = useAppDispatch();

  const [showDayDeal, setShowDayDeal] = useState(true);
  const [choosenDate, setchoosenDate] = useState('');
  const [choosenShotDate, setchoosenShotDate] = useState('');

  const dealsArr: string[] = [];
  for (let item of deals) {
    dealsArr.push(item.dateEnd)
  }

  const dealsHandler = (date: string, dateShot: string) => {
    setShowDayDeal(false)
    setchoosenDate(date)
    setchoosenShotDate(dateShot)
    console.log(date)
  }


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
      await dispatch(getAllDeals());
      // await dispatch(getAllDealTitles());
      // dispatch(addQueryToState(query));
      // await dispatch(getAllPhones());
      // await dispatch(getCompanyByID(params.id));
    }
    fetchData();
  }, []);

  return (
    <section className='dealsmain'>
      {showDayDeal ? 
        <CalendarBig items={deals} showDealsForDay={dealsHandler}/>
        :
        // (dealsWithQuery.map(item => 
        //   <span key={item._id}>{item.companyID.title}</span>  
        // ))
        <DealForDay date={choosenDate} dateShot={choosenShotDate}/>
      }

    </section>
  )
}

export const DealsMain = React.memo(DealsMainInner);