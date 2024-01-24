import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { addDeal } from '../../../../../store/reducers/DealReducer/DealActionCreators';
import { IDealNew, IDealTitle } from '../../../../../types/IDeal';
import CalendarCustom from '../../../../UI/Calendar/CalendarCustom';
import SelectBlock from '../../../../UI/Select/SelectBlock';
import TimeBlock from '../../../../UI/TimePicker/TimePicker';

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
      date: '01.01.2030',
      time: '08:00',
      dealType: '657c071089e96dedfd490f35'
    }
  );

  const dateHandler = (date: string) => {
    // console.log(date)
    setCalendarData(prev => ({
      ...prev,
      date: date,
    }))
  };

  const timeHandler = (timeString: string) => {
    // console.log(hour, minuts)
    setCalendarData(prev => ({
      ...prev,
      time: timeString,
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
    console.log(calendarData);
    const newDeal: IDealNew = {
      companyID: company._id,
      userID: companyFirstUser._id,
      dealTitleID: calendarData.dealType,
      description: '',
      dateEnd: calendarData.date,
      timeEnd: calendarData.time,
      isDone: false,
    };
    
    await dispatch(addDeal(newDeal));
    await dispatch(getCompanyByIDQuery(query));
    
    onAction();
  };

  return (
    <div className={`calendar-block ${position}`}>
      <div className="type">
        <span>Тип:</span>
        <SelectBlock onClickDate={dateTypeHandler}/>
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