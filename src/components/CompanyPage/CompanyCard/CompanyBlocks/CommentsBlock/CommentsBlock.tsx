import React, { FC, useState } from 'react';
import './commentsblock.scss';
import { IoDocumentAttachOutline } from "@react-icons/all-files/io5/IoDocumentAttachOutline";
import { IoSendSharp } from "@react-icons/all-files/io5/IoSendSharp";
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { addComment } from '../../../../../store/reducers/CommentReducer/CommentActionCreater';
import { getCompanyByIDQuery } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { IEntity, ICommentNew } from '../../../../../types/IComment';
import { CommentItem } from './CommentItem';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Loader } from '../../../../UI/Loader/Loader';
import { LoaderSmall } from '../../../../UI/LoaderSmall/LoaderSmall';
import { UserErrorWarning } from '../../../../UI/UserErrorWarning/UserErrorWarning';
import { getCarrierByIDQuery } from '../../../../../store/reducers/CarrierReducer/CarrierActionCreaters';
import { queryForCarrierCard } from '../../../../../services/ClientServices/CarrierServices/queryForCarrierCard';

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
  weekStart: 1,
  months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

interface IProps {
  isCarrier?: boolean;
}

const CommentsBlockInner: FC<IProps> = ({isCarrier = false}) => {
  const { user } = useAppSelector(state => state.authReducer);
  const { carrier, carrierComments } = useAppSelector(state => state.carrierReducer);
  const { company, companyFirstUser, query, companyComments } = useAppSelector(state => state.companyReducer);
  const { error: errorComments } = useAppSelector(state => state.commentReducer);
  const { isLoading } = useAppSelector(state => state.commentReducer)
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState<string>('');

  const addCommentHandler = async () => {
    if (!newComment) {
      return
    };
    
    const addNewComment: ICommentNew = {
      companyID: isCarrier ? carrier._id : company._id,
      userID: isCarrier ? user.id : companyFirstUser._id,
      description: newComment,
      dealType: 'Встреча',
      date: dayjs().format('DD MMMM YYYY'),
      time: dayjs().format('HH:mm'),
    }

    const entity: IEntity = isCarrier ? 'carrier' : 'company';

    await dispatch(addComment({ comment: addNewComment, entity: entity }));

    if (isCarrier) {
      await dispatch(getCarrierByIDQuery(queryForCarrierCard(carrier._id)));
    } else {
      await dispatch(getCompanyByIDQuery(query));
    }
    
    setNewComment('')
  };

  return (
    <>
      {errorComments ? <UserErrorWarning/> : null}
      <section className='comments-block'>
        {isLoading && <LoaderSmall/>}
        <div className="comments">
          <div className="comments__inputblock">
            <IoDocumentAttachOutline size={25} color={'#972f2f'}/>
            <textarea 
              className="comments__input" 
              // type="text" 
              value={newComment} 
              onChange={(e: React.FocusEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
              placeholder='Оставить комментарий'/>
            <IoSendSharp 
              style={{'cursor': 'pointer'}}
              onClick={addCommentHandler}
              size={25} 
              color={'#8598ff'}/>
          </div>
          {isCarrier ? 
            (carrierComments.length ? 
              carrierComments.map(item => (
                <CommentItem key={item._id} item={item}/>
              ))
              : 
              null
            )
            :
            (companyComments.length ? 
              companyComments.map(item => (
                <CommentItem key={item._id} item={item}/>
              ))
              : 
              null
            )

          }

        </div>
      </section>
    </>
  )
}

export const CommentsBlock = React.memo(CommentsBlockInner);