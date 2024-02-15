import React, { FC, useEffect, useState } from 'react'
import './dealsforday.scss'
import CalendarCustom from '../../UI/Calendar/CalendarCustom'
import { useAppSelector } from '../../../hooks/redux';
import { IDeal } from '../../../types/IDeal';
import { useNavigate } from 'react-router-dom';
import { DealsOverdue } from '../DealsOverdue/DealsOverdue';

interface IProps {
  date?: string;
  dateShot: string;
  showCalendar: () => void;
}

const DealForDay:FC<IProps> = ({date = '01.01.2024', dateShot, showCalendar}) => {
  const { deals, dealsWithQuery, dealsByUserQuery } = useAppSelector(state => state.dealReducer);

  interface IArr {
    date: string,
    deals: IDeal[]
  }

  interface IArrArr extends Array<IArr>{}

  const [readyArrDeals, setReadyArrDeals] = useState<[string, IDeal[]][]>([]);

  const navigate = useNavigate();
  // let days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  // function getWeekDay(date: any) {
  //   return days[date.getDay() - 1];  
  // }
  // let date = new Date();
  // const today = getWeekDay(date)
  // const show = () => {
  //   console.log(date.getDate())
  // }

  useEffect(() => {
 
  const myArray = dealsWithQuery.reduce(
    (acc, object) => {
      const hour = object.hourEnd;
      //@ts-ignore
      acc[hour] ??= [];
      //@ts-ignore
      acc[hour].push(object);
      return acc;
    },
    {},
  );

  // console.log(myArrayByCity)
  // // console.log(Object.entries(myArray))
  const newArr: [string, IDeal[]][] = Object.entries(myArray)
  
  // console.log(newArr.sort());
  // console.log(myArray);

  // setReadyArrDeals(Object.entries(myArray))
  setReadyArrDeals(newArr.sort())
//   for (let [key, value] of Object.entries(myArrayByCity)) {
//     console.log(`${key}:${value}`);
// }
    
  }, [dealsWithQuery])
  

  return (
    <section className='deal-for-day'>
      <div className="deal-for-day__container">
        <div className="deal-for-day__calendar">
          <CalendarCustom/>
        </div>

        <div className="deal-for-day__main">
          <div
            // onClick={() => console.log(readyArrDeals)} 
            className="deal-for-day__main__title">
            <span>
              {`Все дела на ${date}г.`}
            </span>
            <button
              onClick={showCalendar}>
              Календарь</button>
          </div>
          {dealsByUserQuery.length ? 
            <DealsOverdue items={dealsByUserQuery}/>
            : null
          }
          <div className="deal-for-day__main__block">
            <div className="deal-for-day__main__block__title">
              Текущие дела:
            </div>

            {readyArrDeals?.map(item => (
              <div key={item[0]} className="deal-for-day__main__block__item">
                <div className="deal-for-day__main__block__time">
                  {item[0] + ':00'}
                </div>
                <div className="deal-for-day__main__block__info">
                  {item[1].map(item => 
                    <a 
                      key={item._id}
                      href={`/companies/${item.companyID._id}`}
                      target="_blank">
                        <b>
                          {item.companyID.title}
                          
                        </b>
                    </a>
                    // <span
                    //   key={item._id}
                    //   onClick={() => navigate(`/companies/${item.companyID._id}`)}>
                    //   {item.companyID.title}
                    // </span>
                  )}
                </div>
              </div>

            ))}



            {/* <div className="deal-for-day__main__block__item">
              <div className="deal-for-day__main__block__time">
                09:00
              </div>
              <div className="deal-for-day__main__block__info">
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
              </div>
            </div>
            <div className="deal-for-day__main__block__item">
              <div className="deal-for-day__main__block__time">
                10:00
              </div>
              <div className="deal-for-day__main__block__info">
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
                <span>ОАО Петровичи</span>
                <span>ОАО Пастовичи</span>
                <span>ЧУП Молоко и рого, филиал Сроительный трест " 345 г.Новогрудок</span>
              </div>
            </div> */}

            {/* <div className="deal-for-day__main__block__row first_row">
              <span className="cell first_cell"></span>
              {days.map((item, index) => 
                <span className={today === item ? 'cell active' : 'cell'}>{item}</span>  
              )}
            </div>
            <div className="deal-for-day__main__block__row">
              <span className="cell first_cell">08:00</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              <span className="cell items">ОАО Новая Припять</span>
              
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealForDay