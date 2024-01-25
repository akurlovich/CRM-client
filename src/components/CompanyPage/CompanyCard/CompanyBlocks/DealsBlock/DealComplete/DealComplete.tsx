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
  const dispatch = useAppDispatch();

  const [dealComment, setDealComment] = useState('');

  const completeDealHandler = async () => {
    const addNewComment: ICommentNew = {
      companyID: company._id,
      userID: companyFirstUser._id,
      description: dealComment,
      dealType: item.dealTitleID.title,
      date: dayjs().format('DD MMMM YYYY'),
      time: dayjs().format('HH:mm'),
    }

    // console.log(addNewComment)
    
    await dispatch(addComment(addNewComment));
    await dispatch(deleteDealByID(item._id));
    await dispatch(getCompanyByIDQuery(query));
    setDealComment('');
    onClose();
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
              onChange={(e: React.FocusEvent<HTMLInputElement>) => setDealComment(e.target.value)}
              type="text"
              autoFocus
              placeholder='Введите комментарий к сделке...'/>
          </div>
          {/* <div className="deal-complete__input">
            <span>Телефон</span>
            <input 
              // value={newContact.phonesID.number}
              // onChange={contactHandler}
              type="text" 
              name="contact.phone.number" 
              placeholder='+375296654556'/>
            <input 
              // value={newContact.phonesID.description}
              // onChange={contactHandler}
              type="text" 
              name="contact.phone.description"  
              placeholder='комментарий'/>
          </div>
          <div className="deal-complete__input">
            <span>Почта</span>
            <input 
              // value={newContact.emailsID.email}
              // onChange={contactHandler}
              type="text" 
              name="contact.email.email" 
              placeholder='example@tut.by'/>
            <input 
              // value={newContact.emailsID.description}
              // onChange={contactHandler}
              type="text" 
              name="contact.email.description" 
              placeholder='комментарий'/>
          </div>
          <div className="deal-complete__input">
            <span>Адрес</span>
            <input 
              // value={newContact.address.main}
              // onChange={contactHandler}
              type='text'
              name='contact.address.main' 
              placeholder='Область, город и тд.'/>
          </div>
          <div className="deal-complete__input">
            <span>Район</span>
            <input 
              // value={newContact.address.district}
              // onChange={contactHandler}
              name='contact.address.district'
              type="text" 
              placeholder='Район...'/>
          </div> */}
        </form>
        <div className="deal-complete__footer">
          <button 
            onClick={completeDealHandler}
            type="submit"
            >
            Завершить сделку
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  ) : null;
}

export const DealComplete = React.memo(DealCompleteInner);