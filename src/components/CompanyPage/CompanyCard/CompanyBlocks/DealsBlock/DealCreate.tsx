import React, { FC, useState } from 'react';
import { IDealTitle } from '../../../../../types/IDeal';
import CalendarCustom from '../../../../UI/Calendar/CalendarCustom';
import SelectBlock from '../../../../UI/Select/SelectBlock';
import TimeBlock from '../../../../UI/TimePicker/TimePicker';

interface IProps {
  options: IDealTitle[];
  onAction: () => void; 
}

const DealCreate: FC<IProps> = ({options, onAction}) => {
  const [calendarData, setCalendarData] = useState(
    {
      date: '1',
      hour: '8',
      minuts: '0',
      dealType: 'Звонок'
    }
  );

  const dateHandler = (date: string | number) => {
    // console.log(date)
    setCalendarData(prev => ({
      ...prev,
      date: date.toString(),
    }))
  };

  const timeHandler = (hour: number | undefined, minuts: number | undefined) => {
    // console.log(hour, minuts)
    setCalendarData(prev => ({
      ...prev,
      hour: hour?.toString() ? hour.toString() : '',
      minuts: minuts?.toString() ? minuts.toString() : '',
    }))
  };

  const dateTypeHandler = (type: string) => {
    // console.log(hour, minuts)
    setCalendarData(prev => ({
      ...prev,
      dealType: type,
    }))
  };

  const addDealHandler = async () => {
    // setCalendarData(prev => ({...prev, show: false}));
    onAction();
    // console.log(calendarData)
  };

  return (
    <div className="calendar">
      <div className="type">
        <span>Тип:</span>
        <SelectBlock options={options} onClickDate={dateTypeHandler}/>
      </div>
      <CalendarCustom onClickDate={dateHandler}/>
      <div className="time">
        <TimeBlock onClickDate={timeHandler}/>
      </div>
      <div className="confirm">
        <button
          onClick={addDealHandler}
          >
          Создать дело
        </button>
        <button
          onClick={onAction}
          >
          Отмена
        </button>
        {/* <IoCheckmarkCircleSharp 
          onClick={() => setCalendarData(prev => ({...prev, show: false}))}
          size={30}/> */}
      </div>
    </div>
  )
}

export default DealCreate