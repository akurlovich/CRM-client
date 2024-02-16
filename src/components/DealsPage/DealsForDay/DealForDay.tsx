import React, { FC, useEffect, useState } from 'react'
import './dealsforday.scss'
import CalendarCustom from '../../UI/Calendar/CalendarCustom'
import { useAppSelector } from '../../../hooks/redux';
import { IDeal } from '../../../types/IDeal';
import { Link, useNavigate } from 'react-router-dom';
import { DealsOverdue } from '../DealsOverdue/DealsOverdue';

interface IProps {
  date?: string;
  dateShot?: string;
  showCalendar?: () => void;
}

const DealForDay: FC<IProps> = ({ }) => {
  const { deals, dealsWithQuery, dealsByUserQuery, choosenDate, choosenShotDate } = useAppSelector(state => state.dealReducer);

  interface IArr {
    date: string,
    deals: IDeal[]
  }

  interface IArrArr extends Array<IArr> { }

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
          <CalendarCustom title={false}/>
        </div>

        <div className="deal-for-day__main">
          <div
            // onClick={() => console.log(readyArrDeals)} 
            className="deal-for-day__main__title">
            <span>
              {`Все дела на ${choosenDate}г.`}
            </span>
            <Link
              to={'/deals'}
            // onClick={showCalendar}
            >
              Календарь</Link>
          </div>
          {dealsByUserQuery.length ?
            <DealsOverdue items={dealsByUserQuery} />
            : null
          }
          {readyArrDeals.length ?
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
                    )}
                  </div>
                </div>

              ))

              }
            </div>
            :
            <div className="deal-for-day__main__block">
              <div className="deal-for-day__main__block__title">
                Текущих дел нет!
              </div>

            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default DealForDay