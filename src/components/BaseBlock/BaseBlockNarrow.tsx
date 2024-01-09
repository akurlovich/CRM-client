import React, { FC } from 'react';
import './baseblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { IoFilterSharp } from "@react-icons/all-files/io5/IoFilterSharp";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoSquareOutline } from '@react-icons/all-files/io5/IoSquareOutline';
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoPersonSharp } from "@react-icons/all-files/io5/IoPersonSharp";
import { IoCallSharp } from "@react-icons/all-files/io5/IoCallSharp";

const BaseBlockNarrowInner: FC = () => {
  return (
    <section className='baseblock small'>
      <div className="baseblockSmall__newdeal">
        <div className="baseblockSmall__newdeal__title">
          <div className="text">
            <span>Дела</span>
            <IoFilterSharp size={20}/>
          </div>
          <div className="icons">
            <IoCalendarOutline size={20}/>
            <IoAddCircleOutline size={20}/>
          </div>
        </div>
        <div className="baseblockSmall__newdeal__add">
          <IoAddCircleOutline/>
          <span>Завтра в 12:00 важный звонок</span>
        </div>
      </div>
      <div className="baseblockSmall__deals">
        <div className="baseblockSmall__deals__item">
          <div className="baseblockSmall__deals__item__title">
            <span>Четверг, 2 ноября 2024г.</span> 
          </div>
          <div className="baseblockSmall__deals__item__info">
            <div className="text">
              <IoSquareOutline size={25}/>
              <div className="item">
                <span>Звонок</span>
                <span>15:12 Курлович Артём</span>
              </div>
            </div>
            <div className="icons">
              <IoStarOutline size={20}/>
              <IoPersonSharp size={20} color={'grey'}/>
              <IoCallSharp size={20} color={'#b4cb4c'}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export const BaseBlockNarrow = React.memo(BaseBlockNarrowInner);