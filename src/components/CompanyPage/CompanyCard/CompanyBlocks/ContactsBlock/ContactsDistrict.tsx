import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { IoPencilOutline } from '@react-icons/all-files/io5/IoPencilOutline';
import React, { FC } from 'react';

interface IProps {
  // title: string;
  district: string;
}

const ContactsDistrictInner: FC<IProps> = ({district}) => {
  return (
    <>
      <div className="title">
        <span>Район</span>
        <IoAddOutline
          style={{cursor: 'pointer'}} 
          size={20}/>
      </div>
      <div className="data last">
        <div className="text">
          <span className='span-address'>{district}</span>
        </div>
        <div className="icons">
          <IoPencilOutline 
            style={{cursor: 'pointer'}}
            size={20}/>
          </div>
      </div>
    </>
  )
}

export const ContactsDistrict = React.memo(ContactsDistrictInner);