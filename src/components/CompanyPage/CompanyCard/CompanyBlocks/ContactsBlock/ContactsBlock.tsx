import React, { FC, useState } from 'react';
import './contactsblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { ContactsPhones } from './ContactsPhones';
import { ContactsEmails } from './ContactsEmails';
import { ContactsAddress } from './ContactsAddress';
import { ContactsDistrict } from './ContactsDistrict';

// interface IProps {
//   companyID: string;
// }

const ContactsBlockInner: FC = ({}) => {
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);
  
  const query: ICompaniesQuery = {
    query: 
      [
        {
          path: "usersID", 
          select: "lastname firstname"
        },
        {
          path: "contactID", 
          // select: "address.district"
        },
        {
          path: "contactID", 
          populate: { path: 'phonesID' }
        },
        {
          path: "contactID", 
          populate: { path: 'emailsID' }
        },
        {
          path: "dealsID", 
          populate: { path: 'dealTitleID' }
        },
        {
          path: "dealsID", 
          populate: { path: 'userID' }
        },
      ], 
    sort: {'contactID.address.district': 'asc'}, 
    limit: 0,
    find: {'_id': company._id}
  };

  const dispatch = useAppDispatch();

  return (
    <section className='contactsblock'>
      <div className="baseblockSmall__newdeal">
        <div className="baseblockSmall__newdeal__title">
          <div className="text">
            <span>Контактные данные</span>
          </div>
          {/* <div className="icons">
            <IoAddCircleOutline 
              style={{cursor: 'pointer'}}
              // onClick={() => console.log(phones)}
              size={20}/>
          </div> */}
        </div>
      </div>
      <div className="baseblockSmall__deals">
        <div className="baseblockSmall__deals__item">
          <div className="contactsblock__contacts">
            <ContactsPhones items={company.contactID && company.contactID.phonesID} query={query}/>
            <ContactsEmails items={company.contactID && company.contactID.emailsID} query={query}/>
            <ContactsAddress 
              address={company?.contactID?.address?.main ? company?.contactID?.address?.main : ''}
              district={company?.contactID?.address?.district ? company?.contactID?.address?.district : ''} 
              contactID={company.contactID?._id} 
              query={query}/>
            <ContactsDistrict 
              address={company?.contactID?.address?.main ? company?.contactID?.address?.main : ''}
              district={company?.contactID?.address?.district ? company?.contactID?.address?.district : ''} 
              contactID={company.contactID?._id} 
              query={query}/>

          </div>
        </div>
      </div>
    </section>
  )
};

export const ContactsBlock = React.memo(ContactsBlockInner);