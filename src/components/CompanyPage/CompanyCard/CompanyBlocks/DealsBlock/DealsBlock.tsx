import React, { FC, useEffect, useState } from 'react';
import './dealsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline';
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPersonSharp } from "@react-icons/all-files/io5/IoPersonSharp";
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp";
import { IoCheckmarkCircleSharp } from "@react-icons/all-files/io5/IoCheckmarkCircleSharp";
import { useAppSelector } from '../../../../../hooks/redux';
import CalendarCustom from '../../../../UI/Calendar/CalendarCustom';
import TimeBlock from '../../../../UI/TimePicker/TimePicker';

const DealsBlockInner: FC = () => {
  const { company, companyDeals } = useAppSelector(state => state.companyReducer);
  const [calendarData, setCalendarData] = useState(
    {
      show: false,
      date: '1',
      hour: '8',
      minuts: '0'
    }
  );

  const dateHandler = (date: string | number) => {
    // console.log(date)
    setCalendarData(prev => ({
      ...prev,
      date: date.toString(),
    }))
  }

  const timeHandler = (hour: number | undefined, minuts: number | undefined) => {
    // console.log(hour, minuts)
    setCalendarData(prev => ({
      ...prev,
      hour: hour?.toString() ? hour.toString() : '',
      minuts: minuts?.toString() ? minuts.toString() : '',
    }))
  }

  
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
              onClick={() => setCalendarData(prev => ({...prev, show: true}))}
              size={20}/>
            <IoAddCircleOutline size={20}/>
            {calendarData.show && 
              <>
                <div className="calendar">
                  <CalendarCustom onClickDate={dateHandler}/>
                  <div className="time">
                    <TimeBlock onClickDate={timeHandler}/>
                  </div>
                  <div className="confirm">
                    <IoCheckmarkCircleSharp 
                      onClick={() => setCalendarData(prev => ({...prev, show: false}))}
                      size={30}/>
                  </div>
                </div>
              </>
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