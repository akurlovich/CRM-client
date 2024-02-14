import React, { FC, useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import { IDeal } from '../../../types/IDeal';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getDealsWithQuery } from '../../../store/reducers/DealReducer/DealActionCreators';
import { ICompaniesQuery } from '../../../types/ICompany';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday  from 'dayjs/plugin/weekday';
// import TimePickerLocale from '../../time-picker/locale/ru_RU';
// import type { PickerLocale } from '../generatePicker';

dayjs.extend(weekday)
// dayjs.extend(weekOfYear)

interface IProps {
  items: IDeal[];
  showDealsForDay: (date: string, dateShot: string) => void;
}

const locale = {
  lang: {
    // placeholder: 'Выберите дату',
    // yearPlaceholder: 'Выберите год',
    // quarterPlaceholder: 'Выберите квартал',
    // monthPlaceholder: 'Выберите месяц',
    // weekPlaceholder: 'Выберите неделю',
    // rangePlaceholder: ['Начальная дата', 'Конечная дата'],
    // rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
    // rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
    // rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
    ...CalendarLocale,
  },
  // timePickerLocale: {
  //   ...TimePickerLocale,
  // },
  
};

// const getMonthData = (value: Dayjs) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };

const CalendarBig: FC<IProps> = ({items, showDealsForDay}) => {
  const { user } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  const getListData = (value: Dayjs) => {
    let listData: any[] = [];
    const monthArr = items.filter(item => +item.monthEnd === (value.month() + 1))
    // console.log('first', value.month());
    // console.log("slkdfjslkj", monthArr);

    const setData = (day: number) => {
      listData.length = 0;
        const dayArr = monthArr.filter(item => +item.dayEnd === day)
        // console.log('dayArr', dayArr)
        for (let item of dayArr) {
          listData.push({
            id: uuidv4(),
            type: "warning",
            content: item.dealTitleID.title + ' ' + item.companyID.title

          })
        }
    }
    switch (value.date()) {
      case 1:
        setData(1)
        break;
      case 2:
        setData(2)
        break;
      case 3:
        setData(3)
        break;
      case 4:
        setData(4)
        break;
      case 5:
        setData(5)
        break;
      case 6:
        setData(6)
        break;
      case 7:
        setData(7)
        break;
      case 8:
        setData(8)
        break;
      case 9:
        setData(9)
        break;
      case 10:
        setData(10)
        break;
      case 11:
        setData(11)
        break;
      case 12:
        setData(12)
        break;
      case 13:
        setData(13)
        break;
      case 14:
        setData(14)
        break;
      case 15:
        setData(15)
        break;
      case 16:
        setData(16)
        break;
      case 17:
        setData(17)
        break;
      case 18:
        setData(18)
        break;
      case 19:
        setData(19)
        break;
      case 20:
        setData(20)
        break;
      case 21:
        setData(21)
        break;
      case 22:
        setData(22)
        break;
      case 23:
        setData(23)
        break;
      case 24:
        setData(24)
        break;
      case 25:
        setData(25)
        break;
      case 26:
        setData(66)
        break;
      case 27:
        setData(27)
        break;
      case 28:
        setData(28)
        break;
      case 29:
        setData(29)
        break;
      case 30:
        setData(30)
        break;
      case 31:
        setData(31)
        break;
      
      default:
        break;
    }
    // console.log(listData)
    return listData || [];
  };


  // const monthCellRender = (value: Dayjs) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Backlog number</span>
  //     </div>
  //   ) : null;
  // };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.length ? 
          <li className='dealsmain__calendar__deals'>
            <span>Всего дел:</span>
            <span>{listData.length}</span>
          </li>
          : null
        }
        {listData.map((item) => (
          <li key={item.id}
            // onClick={() => console.log(item.content)}
            >
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    // if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  ////////////////-------------
  // const [value, setValue] = useState(() => dayjs('2017-01-25'));

  const onSelect = async (newValue: Dayjs) => {
    // setValue(newValue);
    showDealsForDay(newValue.format('DD MMMM YYYY'), newValue.format('DD-MM-YYYY'))

    const query: ICompaniesQuery = {
      query: 
            [ 
              {
                path: "companyID", 
              },
              {
                path: "dealTitleID", 
              },
              {
                path: "userID", 
              }
            ], 
          sort: {'contactID.address.district': 'asc'}, 
          limit: 0,
      
          find: user.isAdmin ? { 
            monthEnd: newValue.format('MM'), 
            dayEnd: newValue.format('DD'),
          } : {
            userID: user.id,
            monthEnd: newValue.format('MM'), 
            dayEnd: newValue.format('DD'),
          }
    }
    
    await dispatch(getDealsWithQuery(query))

    // console.log(dayjs().weekday())
  };

  // const onPanelChange = (newValue: Dayjs) => {
  //   console.log(newValue)
  //   // setValue(newValue);
  // };

  return (
    <>
      {/* <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/> */}
      <Calendar 
        // value={value} 
        onSelect={onSelect} 
        // onSelect={(date, { source }) => {
        //   if (source === 'date') {
        //     console.log('Panel Select:', source);
        //   }
        // }}
        // onPanelChange={onPanelChange}
        cellRender={cellRender} 
        //@ts-ignore
        locale={locale}
        />;
    
    </>


  )
};

export default CalendarBig;