import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCompanyByIDQuery } from '../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllDeals, getAllDealsByUserQuery } from '../../store/reducers/DealReducer/DealActionCreators';
import { ICompaniesQuery } from '../../types/ICompany';
import { IDeal, IDealsQuery } from '../../types/IDeal';
import CalendarBig from '../UI/Calendar/CalendarBig';

import DealForDay from './DealsForDay/DealForDay';
import './dealsmain.scss';
import dayjs from 'dayjs';
import { DealsOverdue } from './DealsOverdue/DealsOverdue';

const DealsMainInner: FC = () => {
  const { deals, dealsWithQuery, dealsByUserQuery } = useAppSelector(state => state.dealReducer);
  const dispatch = useAppDispatch();

  const [showDayDeal, setShowDayDeal] = useState(true);
  const [choosenDate, setchoosenDate] = useState('');
  const [choosenShotDate, setchoosenShotDate] = useState('');

  const dealsArr: string[] = [];
  for (let item of deals) {
    dealsArr.push(item.dateEnd)
  }

  const dealsHandler = async (date: string, dateShot: string) => {
    setShowDayDeal(false)
    setchoosenDate(date)
    setchoosenShotDate(dateShot)
    // console.log(dayjs().format('YYYY'))
    const query: IDealsQuery = {
      find: {
        // usersID: '', 
        monthEnd: { $lte: dayjs().format('MM') }, 
        dayEnd: { $lt: dayjs().format('DD') }, 
        yearEnd: { $lte: dayjs().format('YYYY') }
        // monthEnd: { $lte: '03'}, 
        // dayEnd: { $lt: '14'}, 
        // yearEnd: { $lte: '2024'}
      }
    }
    await dispatch(getAllDealsByUserQuery(query));
  }


  useEffect(() => {
    const fetchData = async () => {
      // const query: IDealsQuery = {
      //   find: {
      //     // usersID: '', 
      //     monthEnd: { $lte: '02'}, 
      //     dayEnd: { $lt: '07'}, 
      //     yearEnd: { $lte: '2024' }
      //   }
      // }

      await dispatch(getAllDeals());
      // await dispatch(getAllDealsByUserQuery(query));
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
        <>
          {/* <DealsOverdue items={dealsByUserQuery}/> */}
          <DealForDay 
            date={choosenDate} 
            dateShot={choosenShotDate} 
            showCalendar={() => setShowDayDeal(true)}/>
        </>
      }

    </section>
  )
}

export const DealsMain = React.memo(DealsMainInner);