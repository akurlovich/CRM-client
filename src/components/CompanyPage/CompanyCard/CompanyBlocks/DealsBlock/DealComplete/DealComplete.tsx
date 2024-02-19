import { IoBagSharp } from '@react-icons/all-files/io5/IoBagSharp';
import { IoCallSharp } from '@react-icons/all-files/io5/IoCallSharp';
import { IoPeople } from '@react-icons/all-files/io5/IoPeople';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { getCompanyByIDQuery } from '../../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { deleteDealByID } from '../../../../../../store/reducers/DealReducer/DealActionCreators';
import { IDeal } from '../../../../../../types/IDeal';
import './dealcomplete.scss';

import { ICommentNew } from '../../../../../../types/IComment';
import { addComment } from '../../../../../../store/reducers/CommentReducer/CommentActionCreater';

import dayjs from 'dayjs';
import { UserErrorWarning } from '../../../../../UI/UserErrorWarning/UserErrorWarning';
// import type { Dayjs } from 'dayjs';
// import updateLocale from 'dayjs/plugin/updateLocale';

// dayjs.extend(updateLocale);

// dayjs.updateLocale('en', {
//   weekdaysMin : ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", ],
//   weekStart: 1,
//   months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
// });

interface IProps {
  item: IDeal,
  isVisible: boolean;
  onClose: () => void;
}

const DealCompleteInner: FC<IProps> = ({isVisible = false, onClose, item}) => {
  const { company, companyFirstUser, query } = useAppSelector(state => state.companyReducer);
  const { error: errorDeals } = useAppSelector(state => state.dealReducer);
  const { error: errorComments } = useAppSelector(state => state.commentReducer);
  const dispatch = useAppDispatch();

  const [disabled, setDisabled] = useState(true);

  const [dealComment, setDealComment] = useState('');

  const commentInputHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setDealComment(e.target.value)
    if (e.target.value) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  };

  const completeDealHandler = async () => {
    if (dealComment) {

      const addNewComment: ICommentNew = {
        companyID: company._id,
        userID: companyFirstUser._id,
        description: dealComment,
        dealType: item.dealTitleID.title,
        date: dayjs().format('DD MMMM YYYY'),
        time: dayjs().format('HH:mm'),
      }
      await dispatch(addComment(addNewComment));
      await dispatch(deleteDealByID(item._id));
      await dispatch(getCompanyByIDQuery(query));
      setDealComment('');
      onClose();
    } else {
      
    }
  }

  const keydownHandler = ({ key }: {key: string}) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  return isVisible ? (
    <>
      {errorDeals ? <UserErrorWarning/> : null}
      {errorComments ? <UserErrorWarning/> : null}
      <div className="deal-complete">
        <div className="deal-complete__dialog">
          <div className="deal-complete__header">
            <h3 className="deal-complete__title">Завершение дела</h3>
          </div>
          <div className="deal-complete__dealtitle">
            <span>{item.dealTitleID?.title}</span>
            {item.dealTitleID?.title == 'Звонок' && <IoCallSharp size={20} color={'#b4cb4c'}/>}
            {item.dealTitleID?.title == 'Дело' && <IoBagSharp size={20} color={'grey'}/>}
            {item.dealTitleID?.title == 'Встреча' && <IoPeople size={20} color={'#de6495'}/>}
          </div>
          <form className="deal-complete__body">
            <div className="deal-complete__input">
              <span className='required'>Комментарий</span>
              <input 
                value={dealComment}
                onChange={commentInputHandler}
                type="text"
                autoFocus
                placeholder='Введите комментарий к сделке...'/>
            </div>
          
          </form>
          <div className="deal-complete__footer">
            <button 
              className={disabled ? 'disabled' : ''}
              disabled={disabled}
              onClick={completeDealHandler}
              // type="submit"
              >
              Завершить дело
            </button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export const DealComplete = React.memo(DealCompleteInner);