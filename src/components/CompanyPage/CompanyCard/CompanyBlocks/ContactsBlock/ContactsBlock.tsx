import React, { FC } from 'react';
import './contactsblock.scss';
import { ICompaniesQuery } from '../../../../../types/ICompany';
import { useAppSelector } from '../../../../../hooks/redux';
import { ContactsPhones } from './ContactsPhones';
import { ContactsEmails } from './ContactsEmails';
import { ContactsAddress } from './ContactsAddress';
import { ContactsDistrict } from './ContactsDistrict';
import { LoaderSmall } from '../../../../UI/LoaderSmall/LoaderSmall';

const ContactsBlockInner: FC = ({}) => {
  const { company } = useAppSelector(state => state.companyReducer);
  const { isLoading: contactLoading } = useAppSelector(state => state.contactReducer);
  const { isLoading: phoneLoading } = useAppSelector(state => state.phoneReducer);
  const { isLoading: emailLoading } = useAppSelector(state => state.emailReducer);
  
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

  return (
    <section className='contactsblock'>
      {contactLoading && <LoaderSmall/>}
      {phoneLoading && <LoaderSmall/>}
      {emailLoading && <LoaderSmall/>}
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
            <ContactsPhones />
            <ContactsEmails />
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