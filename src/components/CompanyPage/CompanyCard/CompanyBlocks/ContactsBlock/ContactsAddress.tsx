import { IoAddOutline } from '@react-icons/all-files/io5/IoAddOutline';
import { IoPencilOutline } from '@react-icons/all-files/io5/IoPencilOutline';
import React, { FC } from 'react';

interface IProps {
  // title: string;
  address: string;
}

const ContactsAddressInner: FC<IProps> = ({address}) => {
  return (
    <>
      <div className="title">
        <span>Адрес</span>
        <IoAddOutline
          style={{cursor: 'pointer'}} 
          size={20}/>
      </div>
      <div className="data last">
        <div className="text">
          <span className='span-address'>{address}</span>
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

export const ContactsAddress = React.memo(ContactsAddressInner);