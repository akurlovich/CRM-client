import React, { FC, useEffect, useState } from 'react';
import './infoblock.scss';
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { useAppSelector } from '../../../../../hooks/redux';
import DealCreate from '../DealsBlock/DealCreate';

const InfoBlockInner: FC = () => {
  const { companyFirstUser, companyDeals } = useAppSelector(state => state.companyReducer);
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
        <div className="info-block__title__deal">
          <IoSquareOutline size={25}/>
          <div className="item">
            {companyDeals[0] ? 
              <>
                <span>{`${companyDeals[0].dateEnd} в ${companyDeals[0].timeEnd}`}</span>
                {/* <span>2 ноября 2024г. в 14:22</span> */}
                <span>{companyDeals[0].dealTitleID.title}</span>
              </>
              : null
            }
          </div>
        </div>
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

// export const BaseBlock = React.memo(BaseBlockInner);
export const InfoBlock = React.memo(InfoBlockInner);