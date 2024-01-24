import { IoEllipsisVerticalOutline } from '@react-icons/all-files/io5/IoEllipsisVerticalOutline';
import { IoNewspaper } from '@react-icons/all-files/io5/IoNewspaper';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { getAllPhones } from '../../../store/reducers/PhoneReducer/PhoneActionCreators';
import { ICompaniesQuery, ICompany } from '../../../types/ICompany';
import { BaseBlock } from '../../BaseBlock/BaseBlock';
import { BaseBlockContacts } from '../../BaseBlock/BaseBlockContacts';
import { BaseBlockNarrow } from '../../BaseBlock/BaseBlockNarrow';
import { BaseBlockSmall } from '../../BaseBlock/BaseBlockSmall';
import { Comments } from '../../Comments/Comments';
import { AddOrder } from '../../OrdersPage/AddOrder/AddOrder';
import { OrdersInCompany } from '../../OrdersPage/OrdersInCompany/OrdersInCompany';
import CalendarCustom from '../../UI/Calendar/CalendarCustom';
import CalendarItem from '../../UI/Calendar/Calendar';
import { Loader } from '../../UI/Loader/Loader';
import { ContactsBlock } from './CompanyBlocks/ContactsBlock/ContactsBlock';
import { DealsBlock } from './CompanyBlocks/DealsBlock/DealsBlock';
import './companycard.scss';
import { getAllDealTitles } from '../../../store/reducers/DealReducer/DealActionCreators';
import { addQueryToState } from '../../../store/reducers/CompanyReducer/CompanySlice';

// interface IProps {
//   item: ICompany;
// };

const CompanyCardInner: FC = () => {
  const { company, companies, isLoading } = useAppSelector(state => state.companyReducer);
  const params = useParams();
  const dispatch = useAppDispatch();
  const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
  // const [companyItem, setCompanyItem] = useState<ICompany>({} as ICompany);
  // const [userItem, setUserItem] = useState({});

  useEffect(() => {
    // console.log('param', params.id)
    const fetchData = async () => {
      if (params.id) {
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
          find: {'_id': params.id}
        };
        await dispatch(getCompanyByIDQuery(query));
        await dispatch(getAllDealTitles());
        dispatch(addQueryToState(query));
        // await dispatch(getAllPhones());
        // await dispatch(getCompanyByID(params.id));
      }
    }; 
      fetchData();
  }, []);

  // useEffect(() => {
  //   //@ts-ignore
  //   // company.usersID.map(item => {
  //   //   setUserItem(item);
  //   // })
  //   // setCompanyItem((prev) => ({...prev, ...company}));
  //   // setUserItem(company?.usersID[0]);
  //   console.log(company.usersID[0])
  // }, [company]);
  
  
  return (
    <>
      {isLoading ? <Loader/> : 
        <section className="company-card">
          <header className="company-card__header">
            <div className="company-card__header__title">
              <div className="avatar">
                <IoNewspaper size={25}/>
              </div>
              <div className="title">
                {company.title}
              </div>
              <IoStarOutline size={20} color={'#3e425e'}/>
              <IoPricetagOutline size={20} color={'#3e425e'}/>
              <IoEllipsisVerticalOutline size={20} color={'#3e425e'}/>
            </div>
            <div
              // onClick={() => console.log(companyItem)}
              className="company-card__header__links">
              <span className="active">Клиент</span>
              <span>+ Сделка</span>
              <span>Процессы</span>
            </div>
          </header>
          <div className="company-card__wrapper">
            <div className="left">
              <BaseBlock/>
              <BaseBlockSmall deal="Задачи"/>
              {/* <BaseBlockSmall deal="Процесссы"/> */}
              <AddOrder isVisible={showAddOrder}/>
              {/* <AddOrder/> */}
              <OrdersInCompany showAddOrder={(() => setShowAddOrder(true))}/>
              <Comments/>
            </div>
            <div className="right">
              <DealsBlock/>
              {/* <ContactsBlock companyID={params.id ? params.id : ''}/> */}
              <ContactsBlock/>
              
            </div>
          </div>
        </section>   
      }
    </>
  )
}

export const CompanyCard = React.memo(CompanyCardInner);