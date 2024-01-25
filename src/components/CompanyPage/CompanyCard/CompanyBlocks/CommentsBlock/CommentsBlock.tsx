import React, { FC, useState } from 'react';
import './commentsblock.scss';
import { IoDocumentAttachOutline } from "@react-icons/all-files/io5/IoDocumentAttachOutline";
import { IoSendSharp } from "@react-icons/all-files/io5/IoSendSharp";
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { addComment } from '../../../../../store/reducers/CommentReducer/CommentActionCreater';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { ICommentNew } from '../../../../../types/IComment';
import { CommentItem } from './CommentItem';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
  weekStart: 1,
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

const CommentsBlockInner: FC = () => {
  const { company, companyFirstUser, query, companyComments } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState<string>('');

  const addCommentHandler = async () => {
    const addNewComment: ICommentNew = {
      companyID: company._id,
      userID: companyFirstUser._id,
      description: newComment,
      dealType: 'Встреча',
      date: dayjs().format('DD MMMM YYYY'),
      time: dayjs().format('HH:mm'),
    }
    
    await dispatch(addComment(addNewComment));
    await dispatch(getCompanyByIDQuery(query));
    setNewComment('')
  }

  return (
    <section className='comments-block'>
      <div className="comments">
        <div className="comments__inputblock">
          <IoDocumentAttachOutline size={25} color={'#972f2f'}/>
          <input 
            className="comments__input" 
            type="text" 
            value={newComment} 
            onChange={(e: React.FocusEvent<HTMLInputElement>) => setNewComment(e.target.value)}
            placeholder='Оставить комментарий'/>
          <IoSendSharp 
            style={{'cursor': 'pointer'}}
            onClick={addCommentHandler}
            size={25} 
            color={'#8598ff'}/>
        </div>
        {companyComments.length ? companyComments.map(item => (
          <CommentItem key={item._id} item={item}/>
          ))
          : null

        }
      </div>
    </section>
  )
}

export const CommentsBlock = React.memo(CommentsBlockInner);