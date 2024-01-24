import React, { FC, useEffect, useState } from 'react';
import './infoblock.scss';
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import DealCreate from '../DealsBlock/DealCreate';
import { DealItem } from '../DealsBlock/DealItem';
import { getCompanyByIDQuery, updateCompanyDescription } from '../../../../../store/reducers/CompanyReducer/CompanyActionCreaters';

const InfoBlockInner: FC = () => {
  const { company, companyFirstUser, companyFirstDeal, query } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(true);
  const [companyDescription, setCompanyDescription] = useState(company.description);

  const addOrUpdateDescription = async () => {
    await dispatch(updateCompanyDescription({companyID: company._id, description: companyDescription}));
    await dispatch(getCompanyByIDQuery(query));
    setShowAddDescription(true);
  };
  
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
        {showAddDescription ? 
          <>
            <span>{company.description ? company.description : 'Введите описание компании'}</span>
            <IoPencilOutline 
              style={{cursor: 'pointer'}}
              onClick={() => setShowAddDescription(false)}
              size={20}/>
          </>
          :
          <div className="contactsblock__contacts__inputs ">
            <textarea 
              value={companyDescription}
              onChange={(e: React.FocusEvent<HTMLTextAreaElement>) => setCompanyDescription(e.target.value)}
              autoFocus
              placeholder='Введите описание компании...'/>
            <div className="buttons">
              <button
                className='add-btn'
                onClick={addOrUpdateDescription}
                >
                Добавить
              </button>
              <button
                className='cansel-btn'
                onClick={() => setShowAddDescription(true)}
                >
                Отмена
              </button>

            </div>
          </div>
        }
      </div>
    </section>
  )
}

export const InfoBlock = React.memo(InfoBlockInner);