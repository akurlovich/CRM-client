import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';
import { IoCheckboxSharp } from '@react-icons/all-files/io5/IoCheckboxSharp'
import { IoBagSharp } from '@react-icons/all-files/io5/IoBagSharp'
import { IoPeople } from '@react-icons/all-files/io5/IoPeople'
import React, { FC, useState } from 'react'
import { IComment } from '../../../../../types/IComment'

interface IProps {
  item: IComment;
}

const CommentItemInner: FC<IProps> = ({item}) => {

  return (
    <div className="comments__commentblock">
      <div className="comments__comment">
        <div className="date">{item.date}</div>
        <div className="comments__comment__info">
          <div className="item">
            <div className="avatar">
              <span>{item.userID?.lastname?.[0] + item.userID?.firstname?.[0]}</span>
            </div>
            <div className="main-container">
              <span className='name'>{item.userID.lastname + ' ' + item.userID.firstname}</span>
              <span className='comment'>{item.description}</span>
              {item.dealType && 
                <div className="deal-item">
                  <IoCheckboxSharp size={20} color={'lightgray'}/>
                  <span>{item.dealType}</span>
                  {item.dealType == 'Звонок' && <IoCallSharp size={20} color={'#b4cb4c'}/>}
                  {item.dealType == 'Дело' && <IoBagSharp size={20} color={'grey'}/>}
                  {item.dealType == 'Встреча' && <IoPeople size={20} color={'#de6495'}/>}
                </div>
              }
            </div>
          </div>
          <div className="time">
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CommentItem = React.memo(CommentItemInner)