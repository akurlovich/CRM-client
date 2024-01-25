import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp'
import React, { FC } from 'react'
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
          <div className="user">
            <div className="name">
              <span>{item.userID?.lastname?.[0] + item.userID?.firstname?.[0]}</span>
              <span>{item.userID.lastname + ' ' + item.userID.firstname}</span>
            </div>
            <div className="time">
              <span>{item.time}</span>
            </div>
          </div>
          <div className="comment">
            <span>{item.description}</span>
          </div>
        </div>
      </div>
      {/* <div className="comments__comment">
        <div className="date">15 апреля 2024г.</div>
        <div className="comments__comment__info">
          <div className="user">
            <div className="name">
              <span>ВЕ</span>
              <span>Васьков Евгений</span>
            </div>
            <div className="time">
              <span>08:56</span>
            </div>
          </div>
          <div className="comment">
            <span>Позвонить завтра.</span>
            <div className="deal">
              <IoCallSharp size={20} color={'#b4cb4c'}/>
              <span>Звонок завершен успешно.</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export const CommentItem = React.memo(CommentItemInner)