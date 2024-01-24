import React, { FC, useEffect, useState } from 'react';
import './dealsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline';
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPersonSharp } from "@react-icons/all-files/io5/IoPersonSharp";
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp";
import { IoCheckbox } from "@react-icons/all-files/io5/IoCheckbox";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import DealCreate from './DealCreate';
import { deleteDealByID } from '../../../../../store/reducers/DealReducer/DealActionCreators';

const DealsBlockInner: FC = () => {
  const { companyDeals } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();

  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showDeleteDeal, setShowDeleteDeal] = useState({
    show: false,
    itemID: '',
  });

  const confirmHandler = async (itemID: string) => {
    setShowDeleteDeal({show: true, itemID: itemID});
    setTimeout(async () => {
      if (window.confirm("Завершить дело?")) {
          await dispatch(deleteDealByID(itemID));
          setShowDeleteDeal({show: false, itemID: ''})
        }
      
    }, 0);
  }

  const deleteHandleer = async () => {
    // console.log(showDeleteDeal.itemID);
    // if (window.confirm("Завершить дело?")) {
    //   await dispatch(deleteDealByID(showDeleteDeal.itemID));
    // }
    setShowDeleteDeal({show: false, itemID: ''})
  };

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
              onClick={() => setShowAddDeal(true)}
              size={20}/>
            <IoAddCircleOutline 
              onClick={() => setShowAddDeal(true)}
              size={20}/>
            {showAddDeal && 
              <DealCreate onAction={() => setShowAddDeal(false)}/>
            }
          </div>
        </div>
        <div className="deals-block__newdeal__add">
          <IoAddCircleOutline 
            onClick={() => setShowAddDeal(true)}
            size={20}/>
          <span>Завтра в 12:00 звонок</span>
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
              {!showDeleteDeal ? 
                <IoSquareOutline 
                  onClick={() => confirmHandler(item._id)}
                  size={25}/>
                : showDeleteDeal.itemID == item._id ?
                  <IoCheckbox
                    onClick={deleteHandleer}
                    color={'green'}
                    size={25}/>
                  : 
                  <IoSquareOutline 
                    onClick={() => confirmHandler(item._id)}
                    size={25}/>
              }
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