import React, { FC, useEffect, useState } from 'react';
import './dealsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline';
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPersonSharp } from "@react-icons/all-files/io5/IoPersonSharp";
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp";
import { useAppSelector } from '../../../../../hooks/redux';
import CalendarCustom from '../../../../UI/Calendar/CalendaCustom';

const DealsBlockInner: FC = () => {
  const { company, companyDeals } = useAppSelector(state => state.companyReducer);
  const [showCalendar, setShowCalendar] = useState(false);

  
  return (
    <section className='deals-block'>
      <div className="deals-block__newdeal">
        <div className="deals-block__newdeal__title">
          <div className="text">
            <span>Дела</span>
            <IoFilterSharp size={20}/>
          </div>
          <div className="icons">
            <IoCalendarOutline 
              onClick={() => setShowCalendar(true)}
              size={20}/>
            <IoAddCircleOutline size={20}/>
            {showCalendar && 
              <div className="calendar">
                <CalendarCustom onClickDate={setShowCalendar}/>
              </div>
            }
          </div>
        </div>
        <div className="deals-block__newdeal__add">
          <IoAddCircleOutline/>
          <span>Завтра в 12:00 важный звонок</span>
        </div>
      </div>
      <div className="deals-block__deals">
      {companyDeals.length ? companyDeals.map(item => (
        <div key={item._id} className="deals-block__deals__item">
          <div className="deals-block__deals__item__title">
            <span>{item.dateEnd}</span> 
          </div>
          <div className="deals-block__deals__item__info">
            <div className="text">
              <IoSquareOutline size={25}/>
              <div className="item">
                <span>{item.dealTitleID.title}</span>
                {/* <span>15:12 {company.dealsID?.[0].userID?.lastname + ' ' + company.dealsID?.[0].userID?.firstname}</span> */}
                <span>{item.timeEnd + ' ' + item.userID.lastname + ' ' +item.userID.firstname}</span>
              </div>
            </div>
            <div className="icons">
              <IoStarOutline size={20}/>
              <IoPersonSharp size={20} color={'grey'}/>
              <IoCallSharp size={20} color={'#b4cb4c'}/>
            </div>
          </div>
        </div>
        )) 
        :
        <div className="deals-block__deals__empty">
          <IoCalendarOutline size={40} color='#aebbcb'/>
          <span>Активных дел нет</span>
        </div>
      }
      </div>
    </section>
  )
};

export const DealsBlock = React.memo(DealsBlockInner);