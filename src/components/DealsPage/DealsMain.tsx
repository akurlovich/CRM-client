import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCompanyByIDQuery } from '../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllDeals, getAllDealsByUserQuery } from '../../store/reducers/DealReducer/DealActionCreators';
import { ICompaniesQuery } from '../../types/ICompany';
import { IDeal, IDealsQuery } from '../../types/IDeal';
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
      const query: IDealsQuery = {
        find: {
          // usersID: '', 
          monthEnd: { $lte: '02'}, 
          dayEnd: { $lt: '07'}, 
          yearEnd: { $lte: '2024' }
        }
      }

      
      await dispatch(getAllDeals());
      await dispatch(getAllDealsByUserQuery(query));
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