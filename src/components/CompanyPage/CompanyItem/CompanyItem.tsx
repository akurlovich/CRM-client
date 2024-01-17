import React, { FC } from 'react';
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { ICompany } from '../../../types/ICompany';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  company: ICompany,
}

const CompanyItemInner: FC<IProps> = ({company}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickHandler = () => {
    // console.log(company._id)
    // console.log(location)
    navigate(`/companies/${company._id}/card`);
  }

  return (
    <div 
      onClick={onClickHandler}
      className="company__main__row">
      <IoSquareOutline width={25}/>
      <span className='cell data'>{company.title}</span>
      <div className='cell data user'>
        <span>{`${company.usersID[0].lastname[0]}${company.usersID[0].firstname[0]}`}</span>
        <span>{`${company.usersID[0].lastname} ${company.usersID[0].firstname}`}</span>
      </div>
      <span className='cell data'>05 октябрь 2023г.</span>
      <span className='cell data'>31 августа 2024г.</span>
      <span className='cell data'>{`${company.contactID.address.district ? company.contactID.address.district : 'нет'}`}</span>
    </div>    
  )
}

export const CompanyItem = React.memo(CompanyItemInner);