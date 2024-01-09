import React, { FC } from 'react';
import './company.scss';

const CompanyInner: FC = () => {
  return (
    <section className='company'>
      list
    </section>
  )
}

export const Company = React.memo(CompanyInner);