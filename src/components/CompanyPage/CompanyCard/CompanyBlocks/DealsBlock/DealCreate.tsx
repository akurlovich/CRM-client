import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { addDeal } from '../../../../../store/reducers/DealReducer/DealActionCreators';
import { IDealNew, IDealTitle } from '../../../../../types/IDeal';
import CalendarCustom from '../../../../UI/Calendar/CalendarCustom';
import SelectBlock from '../../../../UI/Select/SelectBlock';
import TimeBlock from '../../../../UI/TimePicker/TimePicker';
import dayjs from 'dayjs';

interface IProps {
  // options: IDealTitle[];
  onAction: () => void; 
  position?: string;
}

const DealCreate: FC<IProps> = ({onAction, position}) => {
  const { company, companyFirstUser, query } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();
  const [calendarData, setCalendarData] = useState(
    {
      date: dayjs().format('DD.MM.YYYY'),
      dateShort: [dayjs().format('DD'), dayjs().format('MM'), dayjs().format('YYYY')],
      time: '08:00',
      timeShort: ['08', '00'],
      dealType: '657c071089e96dedfd490f35'
    }
  );

  const dateHandler = (date: string, dateShort: string) => {
    const dateArr: string[] = dateShort.split('-');
    // console.log("date", date)
    // console.log("dateShort", dateShort)
    setCalendarData(prev => ({
      ...prev,
      date: date,
      dateShort: dateArr,
    }))
  };

  const timeHandler = (timeString: string) => {
    const timeArr: string[] = timeString.split(':');
    // console.log(timeArr)
    setCalendarData(prev => ({
      ...prev,
      time: timeString,
      timeShort: timeArr,
      // hour: hour?.toString() ? hour.toString() : '',
      // minuts: minuts?.toString() ? minuts.toString() : '',
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
    // console.log(calendarData);
    const newDeal: IDealNew = {
      companyID: company._id,
      userID: companyFirstUser._id,
      dealTitleID: calendarData.dealType,
      description: '',
      dateEnd: calendarData.date,
      timeEnd: calendarData.time,
      dayEnd: calendarData.dateShort[0],
      monthEnd: calendarData.dateShort[1],
      yearEnd: calendarData.dateShort[2],
      minuteEnd: calendarData.timeShort[1],
      hourEnd: calendarData.timeShort[0],
      isDone: false,
    };
    
    await dispatch(addDeal(newDeal));
    await dispatch(getCompanyByIDQuery(query));
    
    onAction();
  };

  return (
    <div className={`calendar-block ${position}`}>
      <div className="calendar-block__title">
        <span>Выберите дату и время:</span>
      </div>
      <div className="calendar-block__block">
        <div className="calendar-block__block_left">
          <CalendarCustom onClickDate={dateHandler}/>
        </div>
        <div className="calendar-block__block_right">
          <div className="type">
            <span>Время:</span>
            <TimeBlock onClickDate={timeHandler}/>
          </div>
          <div className="type">
            <span>Тип:</span>
            <SelectBlock onClickDate={dateTypeHandler}/>
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
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default DealCreate