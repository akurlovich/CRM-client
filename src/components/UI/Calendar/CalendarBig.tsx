import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
// import TimePickerLocale from '../../time-picker/locale/ru_RU';
// import type { PickerLocale } from '../generatePicker';

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

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  // console.log(listData)
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarBig: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  ////////////////-------------
  // const [value, setValue] = useState(() => dayjs('2017-01-25'));

  const onSelect = (newValue: Dayjs) => {
    // setValue(newValue);
    console.log(newValue.format('DD MMMM YYYY'))
  };

  const onPanelChange = (newValue: Dayjs) => {
    console.log(newValue)
    // setValue(newValue);
  };

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