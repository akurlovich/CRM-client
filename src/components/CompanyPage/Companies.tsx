import React, { FC, useEffect, useState } from 'react';
import './companies.scss';
import { IoDocumentOutline } from "@react-icons/all-files/io5/IoDocumentOutline";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoFilterOutline } from "@react-icons/all-files/io5/IoFilterOutline";
import { IoDuplicateOutline } from "@react-icons/all-files/io5/IoDuplicateOutline";
import { IoFilter } from "@react-icons/all-files/io5/IoFilter";
import { AddCompany } from './AddCompany/AddCompany';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllCompanies, getAllCompaniesQuery, getSearchResultDistrictCompanies, getSearchResultUserCompanies } from '../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllUsers, getUserByID } from '../../store/reducers/UserReducer/UserActionCreators';
import { Loader } from '../UI/Loader/Loader';
import { CompanyItem } from './CompanyItem/CompanyItem';
import { ICompaniesQuery } from '../../types/ICompany';
import { UserErrorWarning } from '../UI/UserErrorWarning/UserErrorWarning';
import { SelectUsers } from '../UI/Select/SelectUsers';

import { USER_BG_COLORS } from '../../constants/user';
import { randomBGColor } from '../../services/ClientServices/RandomBGColor';
import Search, { SearchProps } from 'antd/es/input/Search';

// interface ICompanyItem {
//   title: string,
//   user: string,
//   district: string,
//   lastCommentDate: string,
//   nextCommentDate: string,
// }

const CompanyInner: FC = () => {
  const { companies, isLoading, error: errorCompany, companiesCount } = useAppSelector(state => state.companyReducer);
  const { user } = useAppSelector(state => state.authReducer);
  const { users } = useAppSelector(state => state.userReducer);

  const dispatch = useAppDispatch();
  
  const [showAddCompany, setShowAddCompany] = useState<boolean>(false);
  const [sortAscDecs, setSortAscDecs] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [isFetching, setIsFetching] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState('');
  const [district, setDistrict] = useState('');
  
  const query: ICompaniesQuery = {
    query: 
      [{
        path: "usersID", 
        // select: "lastname firstname"
      },
      {
        path: "contactID", 
        select: "address.district"
      },
      {
        path: "commentsID", 
        populate: { path: 'userID' }
      },
      {
        path: "dealsID", 
        // populate: { path: 'dealTitleID' }
      },
      // {
      //   path: "dealsID", 
      //   populate: { path: 'userID' }
      // },
      // {
      //   path: "contactID", 
      //   populate: { path: 'phonesID' }
      // },
      // {
      //   path: "contactID", 
      //   populate: { path: 'emailsID' }
      // }

      ], 
    page: 1,
    // sort: {'createdAt': 'asc'}, 
    // sort: {'createdAt': 'desc'}, 
    sort: { [`${sortBy}`]: `${sortAscDecs ? 'asc' : 'desc'}`},
    limit: 1000,
//TODO --  надо userID брать из reducer, когда пользователь будет залогинен, а также если он АДМИН, пустая строка (верунть все записи)
    find: user.isAdmin ? {} : { usersID: user.id},
    // find: { usersID: '65a4ed82f45087cf955a9bac'}
  };

  const titleSort = async () => {
    setIsFetching(true)
    setSortAscDecs(prev => !prev);
    setSortBy('title')
    // await dispatch(getAllCompaniesQuery(query));
  };

  const onSearch: SearchProps['onSearch'] = async (value) => {
    // console.log(value)
    setDistrict(value);
    await dispatch(getSearchResultDistrictCompanies(value));
    setSelectedUserID('')
  };

  const selectedUserHandler = async (id: string) => {
    setSelectedUserID(id);
    await dispatch(getSearchResultUserCompanies(id));
    setDistrict('');
  };

  useEffect(() => {
    setSelectedUserID('')
  }, [district])
  
  useEffect(() => {
    setDistrict('')
  }, [selectedUserID])

  useEffect(() => {
    // console.log('first')
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      await dispatch(getAllCompaniesQuery(query));
    };
    try {
      if (isMounted) {
        if (isFetching) {
          // console.log('first2')
          fetchData();
        }
      }
    } catch (error) {
      console.log(error)
    }

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [sortBy, sortAscDecs])
  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      await dispatch(getAllCompaniesQuery(query));
      await dispatch(getAllUsers());
    };

    try {
      if (isMounted) {
        fetchData();
      }
    } catch (error) {
      console.log(error)
    }

    return () => {
      isMounted = false;
      controller.abort();
    }
   
  }, []);

  return (
    <>
      {errorCompany ? <UserErrorWarning/> : null}
      {isLoading ? <Loader/> : 
        <>
          <AddCompany isVisible={showAddCompany} onClose={() => setShowAddCompany(false)}/>
          <section className='company'>
            <div className="company__filters">
              <div className="company__filters__title">
                <span>Фильтр</span>
                <IoFilter size={25}/>
              </div>
              <div className="company__filters__block">
                <div className="company__filters__item">
                  <span>Сотрудники:</span>
                  <SelectUsers 
                    items={users}
                    selectedUserID={selectedUserHandler}
                    value={selectedUserID}
                    />
                  {selectedUserID ? 
                    <span>{`Всего: ${companiesCount}`}</span>
                    : null
                  }
                </div>
                <div className="company__filters__item">
                  <span>Район:</span>
                  <Search 
                    defaultValue={district}
                    placeholder="Район" 
                    onSearch={onSearch} 
                    style={{ width: '100%' }} />
                </div>
              </div>
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
                  onClick={() => setShowAddCompany(true)}
                  className="company__header__btn">
                  Добавить клиента
                </button>
              </div>
              {companies ? 
                <div className="company__main">
                  <div className="company__main__row first_row">
                    <IoDuplicateOutline width={30}/>
                    <span 
                      onClick={titleSort}
                      className='cell'>Название</span>
                    <span className='cell'>Ответственный</span>
                    <span className='cell'>Дата следующей коммуникации</span>
                    <span className='cell'>Дата последней коммуникации</span>
                    <span className='cell'>Район</span>
                  </div>
                  {companies.map(item => (
                    <CompanyItem key={item._id} company={item}/>
                    )) 
                  }
                  {/* <div className="company__main__row">
                    <IoSquareOutline width={25}/>
                    <span className='cell data'>ОАО Строительный трест номер 212 Дрогичин</span>
                    <div className='cell data user'>
                      <span>ВА</span>
                      <span>Васьков Евгений</span>
                    </div>
                    <span className='cell data'>05 сентября 2023г.</span>
                    <span className='cell data'>31 мая 2024г.</span>
                    <span className='cell data'>Малоритский</span>
                  </div> */}
                  <div className="company__main__items">

                  </div>
                </div>
                :
                <div className="">У Вас нет компаний, добавте!</div>
              }
            </div>
          </section>
        </>  
      }
    </>
  )
}

export const Company = React.memo(CompanyInner);