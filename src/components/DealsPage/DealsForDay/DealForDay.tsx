import React, { FC, useEffect, useState } from 'react'
import './dealsforday.scss'
import CalendarCustom from '../../UI/Calendar/CalendarCustom'
import { useAppSelector } from '../../../hooks/redux';
import { IDeal } from '../../../types/IDeal';

interface IProps {
  date?: string;
  dateShot: string;
}

const DealForDay:FC<IProps> = ({date = '01.01.2024', dateShot}) => {
  const { deals, dealsWithQuery } = useAppSelector(state => state.dealReducer);

  interface IArr {
    date: string;

  }

  const [readyArrDeals, setReadyArrDeals] = useState<[string, IDeal[]][]>([]);
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
      const city = object.hourEnd;
      //@ts-ignore
      acc[city] ??= [];
      //@ts-ignore
      acc[city].push(object);
      return acc;
    },
    {},
  );

  // console.log(myArrayByCity)
  // console.log(Object.entries(myArray))
  const newArr = Object.entries(myArray)
  //@ts-ignore
  setReadyArrDeals(Object.entries(myArray))
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
            onClick={() => console.log(readyArrDeals)} 
            className="deal-for-day__main__title">
            {`Дела на ${date}г.`}
          </div>
          <div className="deal-for-day__main__block">

            {readyArrDeals.map(item => (
              <div className="deal-for-day__main__block__item">
                <div className="deal-for-day__main__block__time">
                  {item[0] + ':00'}
                </div>
                <div className="deal-for-day__main__block__info">
                  {item[1].map(item => 
                    <span>{item.companyID.title}</span>
                  )}
                </div>
              </div>

            ))}



            <div className="deal-for-day__main__block__item">
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
            </div>

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