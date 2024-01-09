import React, { FC } from 'react';
import './comments.scss';
import { IoDocumentAttachOutline } from "@react-icons/all-files/io5/IoDocumentAttachOutline";
import { IoSendSharp } from "@react-icons/all-files/io5/IoSendSharp";
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';

const CommentsInner: FC = () => {
  return (
    <section className='baseblock'>
      <div className="comments">
        <div className="comments__inputblock">
          <IoDocumentAttachOutline size={25} color={'#972f2f'}/>
          <input className="comments__input" type="text" value="" placeholder='Оставить комментарий'/>
          <IoSendSharp size={25} color={'#8598ff'}/>
        </div>
        <div className="comments__commentblock">
          <div className="comments__comment">
            <div className="date">15 декабря 2024г.</div>
            <div className="comments__comment__info">
              <div className="user">
                <div className="name">
                  <span>КА</span>
                  <span>Курлович Артем</span>
                </div>
                <div className="time">
                  <span>08:56</span>
                </div>
              </div>
              <div className="comment">
                <span>Сегодня не опднял трубку, буду звонить черз 3 недели.</span>
              </div>
            </div>
          </div>
          <div className="comments__comment">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export const Comments = React.memo(CommentsInner);