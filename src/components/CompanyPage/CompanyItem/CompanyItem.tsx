import React, { FC } from 'react';
import { IoSquareOutline } from "@react-icons/all-files/io5/IoSquareOutline";
import { ICompany } from '../../../types/ICompany';

interface IProps {
  company: ICompany,
}

const CompanyItemInner: FC<IProps> = ({company}) => {

  return (
    <div className="company__main__row">
      <IoSquareOutline width={25}/>
      <span className='cell data'>{company.title}</span>
      <div className='cell data user'>
        <span>{`${company.users[0].lastname[0]}${company.users[0].firstname[0]}`}</span>
        <span>{`${company.users[0].lastname} ${company.users[0].firstname}`}</span>
      </div>
      <span className='cell data'>05 октябрь 2023г.</span>
      <span className='cell data'>31 августа 2024г.</span>
      <span className='cell data'>{`${company.contact?.district ? company.contact?.district : ''}`}</span>
    </div>    
  )
}

export const CompanyItem = React.memo(CompanyItemInner);