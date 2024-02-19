import React, { FC, useEffect, useState } from 'react';
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { ICompaniesQuery, ICompany } from '../../../types/ICompany';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCompaniesQuery } from '../../../store/reducers/CompanyReducer/CompanyActionCreaters';
import { useAppDispatch } from '../../../hooks/redux';
import dayjs from 'dayjs';
import { IDeal } from '../../../types/IDeal';

interface IProps {
  company: ICompany,
}

const CompanyItemInner: FC<IProps> = ({company}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [nextDate, setNextDate] = useState<IDeal[]>([]);

  useEffect(() => {
    if (nextDate.length) {
      return
    }
    if (company.dealsID.length) {
      const arr = [...company.dealsID]
      const next: IDeal[] = arr.sort((a, b) => {
        let fa = a.monthEnd;
        let fb = b.monthEnd;
    
        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
      });
      
      if (next.length) {
        setNextDate(next)
      }

    }
    
  }, [company])
  


  const onClickHandler = async () => {
    // console.log(company._id)
    // console.log(location)
    // const query: ICompaniesQuery = {
    //   query: 
    //     [{
    //       path: "usersID", 
    //       select: "lastname firstname"
    //     },
    //     {
    //       path: "contactID", 
    //       // select: "address.district"
    //     },
    //     {
    //       path: "contactID", 
    //       populate: { path: 'phonesID' }
    //     },
    //     {
    //       path: "contactID", 
    //       populate: { path: 'emailsID' }
    //     }

    //   ], 
    //   sort: {'contactID.address.district': 'asc'}, 
    //   limit: 0,
    //   find: {'_id': company._id}
    // };
    // await dispatch(getAllCompaniesQuery(query));
    navigate(`/companies/${company._id}`);
  }

  return (
    <div 
      onClick={onClickHandler}
      // onClick={() => console.log(company.dealsID)}
      className="company__main__row">
      <IoSquareOutline width={25}/>
      <span className='cell data'>{company.title}</span>
      <div className='cell data user'>
        <span>{`${company.usersID[0]?.lastname[0]}${company.usersID[0]?.firstname[0]}`}</span>
        <span>{`${company.usersID[0]?.lastname} ${company.usersID[0]?.firstname}`}</span>
      </div>
      <span className='cell data'>{nextDate[0]?.dateEnd ? nextDate[0]?.dateEnd  : ''}</span>
      <span className='cell data'>{company.commentsID[company.commentsID.length -1]?.date}</span>
      <span className='cell data'>{`${company.contactID.address.district ? company.contactID.address.district : 'нет'}`}</span>
    </div>    
  )
}

export const CompanyItem = React.memo(CompanyItemInner);