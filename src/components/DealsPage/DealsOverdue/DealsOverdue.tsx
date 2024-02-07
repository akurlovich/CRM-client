import React, { FC } from 'react'
import { IDeal } from '../../../types/IDeal'
import './dealsoverdue.scss'
import dayjs from 'dayjs';

interface IProps {
  items: IDeal[];
}

const DealsOverdueInner: FC<IProps> = ({items}) => {
  return (
    <div className='deals-overdue'>
      <div className="deals-overdue__container">
        <div className="deals-overdue__title">
          <span>{`Просроченные дела по состоянию на ${dayjs().format('DD MMMM YYYY') }:`}</span>
        </div>
        <div className="deals-overdue__items">
          {items.map(item => 
            <a 
              key={item._id}
              href={`/companies/${item.companyID._id}`} 
              target="_blank"
              >
              {item.companyID.title + ' ' + item.dateEnd}
            </a>
          )}

        </div>
      </div>
    </div>
  )
}

export const DealsOverdue = React.memo(DealsOverdueInner)