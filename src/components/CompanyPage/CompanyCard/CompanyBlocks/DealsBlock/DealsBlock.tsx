import React, { FC, useState } from 'react';
import './dealsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { useAppSelector } from '../../../../../hooks/redux';
import DealCreate from './DealCreate';
import { DealItem } from './DealItem';


const DealsBlockInner: FC = () => {
  const { companyDeals } = useAppSelector(state => state.companyReducer);

  const [showAddDeal, setShowAddDeal] = useState(false);

  return (
    <section className='deals-block'>
      <div className="deals-block__newdeal">
        <div className="deals-block__newdeal__title">
          <div className="text">
            <span
              style={{'cursor': 'pointer'}}>
              Дела</span>
            <IoFilterSharp size={20}/>
          </div>
          <div className="icons">
            <IoCalendarOutline 
              style={{'cursor': 'pointer'}}
              onClick={() => setShowAddDeal(true)}
              size={20}/>
            <IoAddCircleOutline 
              style={{'cursor': 'pointer'}}
              onClick={() => setShowAddDeal(true)}
              size={20}/>
            {showAddDeal && 
              <DealCreate onAction={() => setShowAddDeal(false)}/>
            }
          </div>
        </div>
        <div className="deals-block__newdeal__add">
          <IoAddCircleOutline 
            style={{'cursor': 'pointer'}}
            onClick={() => setShowAddDeal(true)}
            size={20}/>
          <span
            onClick={() => setShowAddDeal(true)}
            style={{'cursor': 'pointer'}}>
            Завтра в 12:00 звонок</span>
        </div>
      </div>
      <div className="deals-block__deals">
      {companyDeals.length ? companyDeals.map(item => (
        <DealItem key={item._id} item={item}/>
     
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