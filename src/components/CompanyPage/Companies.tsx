import React, { FC, useEffect, useState } from 'react';
import './companies.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { AddCompany } from './AddCompany/AddCompany';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllCompanies, getAllCompaniesQuery } from '../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllUsers, getUserByID } from '../../store/reducers/UserReducer/UserActionCreators';
import { Loader } from '../UI/Loader/Loader';
import { CompanyItem } from './CompanyItem/CompanyItem';
import { ICompaniesQuery } from '../../types/ICompany';

// interface ICompanyItem {
//   title: string,
//   user: string,
//   district: string,
//   lastCommentDate: string,
//   nextCommentDate: string,
// }

const CompanyInner: FC = () => {
  const { companies, isLoading } = useAppSelector(state => state.companyReducer);
  const { users, user } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();
  
  const [isModal, setIsModal] = useState<boolean>(false);
  // const [companiesArray, setCompaniesArray] = useState<ICompanyItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    //   const query: ICompaniesQuery[] = [{
    //     path: "usersID", 
    //     select: "lastname firstname"
    // },
    // {
    //     path: "contactID", 
    //     select: "address.district"
    // }];
      const query: ICompaniesQuery = {
        query: 
          [{
            path: "usersID", 
            select: "lastname firstname"
          },
          {
            path: "contactID", 
            select: "address.district"
          },
          // {
          //   path: "contactID", 
          //   populate: { path: 'phonesID' }
          // },
          // {
          //   path: "contactID", 
          //   populate: { path: 'emailsID' }
          // }

        ], 
        //@ts-ignore
        sort: {'contactID.address.district': 'asc'}, 
        limit: 0
      };

      await dispatch(getAllCompaniesQuery(query));
      // await dispatch(getAllCompanies());
      await dispatch(getAllUsers());
      // await dispatch(getUserByID(companies[0]?.usersID[0]));
      // console.log(users)
    };

    fetchData();
   
  }, []);

  // useEffect(() => {
  //   dispatch(getUserByID(companies[0]?.users[0]?.userID));
   
  // }, [users]);

  return (
    <>
      {isLoading && <Loader/>}
      <AddCompany isVisible={isModal} onClose={() => setIsModal(false)}/>
      <section className='company'>
        <div className="company__filters">
          filter
        </div>
        <div className="company__container">
          <div className="company__header">
            <div className="company__header__title">
              <div className="title">
                <span>Все клиенты</span>
              </div>
              <div className="icons">
                <IoDocumentOutline size={25}/>
                <IoExitOutline size={25}/>
                <IoFilterOutline size={25}/>
              </div>
            </div>
            <button 
              onClick={() => setIsModal(true)}
              className="company__header__btn">
              Добавить клиента
            </button>
          </div>
          <div className="company__main">
            <div className="company__main__row first_row">
              <IoDuplicateOutline width={30}/>
              <span className='cell'>Название</span>
              <span className='cell'>Ответственный</span>
              <span className='cell'>Дата следующей коммуникации</span>
              <span className='cell'>Дата последней коммуникации</span>
              <span className='cell'>Район</span>
            </div>
            {companies.map(item => (
              <CompanyItem key={item._id} company={item}/>
              )) 
            }
            <div className="company__main__row">
              <IoSquareOutline width={25}/>
              <span className='cell data'>ОАО Строительный трест номер 212 Дрогичин</span>
              <div className='cell data user'>
                <span>ВА</span>
                <span>Васьков Евгений</span>
              </div>
              <span className='cell data'>05 сентября 2023г.</span>
              <span className='cell data'>31 мая 2024г.</span>
              <span className='cell data'>Малоритский</span>
            </div>
            <div className="company__main__items">

            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export const Company = React.memo(CompanyInner);