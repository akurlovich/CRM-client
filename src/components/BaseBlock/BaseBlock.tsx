import React, { FC, useEffect } from 'react';
import './baseblock.scss';
import { IoPencilOutline } from "@react-icons/all-files/io5/IoPencilOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { ICompany } from '../../types/ICompany';
import { useAppSelector } from '../../hooks/redux';

interface IProps {
  company: any;
}

const BaseBlockInner: FC = () => {
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);
  
  return (
    <section className='baseblock'>
      <div className="baseblock__title">
        <div className="baseblock__title__user">
          <div className="avatar">КА</div>
          <div className="name">
          <span>{company.usersID ? `${company.usersID[0].lastname} ${company.usersID[0].firstname}` : ''}</span>
            {/* <span>{`${company.usersID[0]?.lastname} ${company.usersID[0]?.firstname}`}</span> */}
            <span>Ответственный</span>
          </div>
        </div>
        <div className="baseblock__title__deal">
          <IoSquareOutline size={25}/>
          <div className="item">
            <span>2 ноября 2024г. в 14:22</span>
            <span>Звонок</span>
          </div>
        </div>
        <div className="baseblock__title__nitification">
          <span>+ Напоминание</span>
        </div>
      </div>
      <div className="baseblock__description">
        <span>Занимаются сельским хозяйством</span>
        <IoPencilOutline size={20}/>
      </div>
    </section>
  )
}

// export const BaseBlock = React.memo(BaseBlockInner);
export const BaseBlock = BaseBlockInner;