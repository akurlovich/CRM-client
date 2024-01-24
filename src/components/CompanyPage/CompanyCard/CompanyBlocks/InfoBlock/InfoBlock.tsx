import React, { FC, useEffect, useState } from 'react';
import './infoblock.scss';
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { useAppSelector } from '../../../../../hooks/redux';
import DealCreate from '../DealsBlock/DealCreate';
import { DealItem } from '../DealsBlock/DealItem';

const InfoBlockInner: FC = () => {
  const { companyFirstUser, companyDeals, companyFirstDeal } = useAppSelector(state => state.companyReducer);
  const [showAddDeal, setShowAddDeal] = useState(false);
  
  return (
    <section className='info-block'>
      <div className="info-block__title">
        <div className="info-block__title__user">
          <div className="avatar">{companyFirstUser.lastname?.[0] + companyFirstUser.firstname?.[0]}</div>
          <div className="name">
            <span>{companyFirstUser.lastname + ' ' + companyFirstUser.firstname}</span>
            <span>Ответственный</span>
          </div>
        </div>
        <DealItem item={companyFirstDeal} fromBlock={true}/>
        <div className="info-block__title__nitification">
          {showAddDeal && 
            <DealCreate onAction={() => setShowAddDeal(false)} position='infoblock'/>
          }
          <span
            style={{'cursor': 'pointer'}}
            onClick={() => setShowAddDeal(true)}>
            + Дело</span>
        </div>
      </div>
      <div className="info-block__description">
        <span>Занимаются сельским хозяйством</span>
        <IoPencilOutline size={20}/>
      </div>
    </section>
  )
}

export const InfoBlock = React.memo(InfoBlockInner);