import React, { FC } from 'react';
import './baseblock.scss';
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";

const BaseBlockInner: FC = () => {
  return (
    <section className='baseblock'>
      <div className="baseblock__title">
        <div className="baseblock__title__user">
          <div className="avatar">КА</div>
          <div className="name">
            <span>Курлович Артем</span>
            <span>Ответственный</span>
          </div>
        </div>
        <div className="baseblock__title__deal">
          <IoSquareOutline size={25}/>
          <div className="item">
            <span>2 ноября 2024г. в 14:22</span>
            <span>Звонок</span>
          </div>
        </div>
        <div className="baseblock__title__nitification">
          <span>+ Напоминание</span>
        </div>
      </div>
      <div className="baseblock__description">
        <span>Занимаются сельским хозяйством</span>
        <IoPencilOutline size={20}/>
      </div>
    </section>
  )
}

export const BaseBlock = React.memo(BaseBlockInner);