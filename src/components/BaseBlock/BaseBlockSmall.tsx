import React, { FC } from 'react';
import './baseblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";

interface IProps {
  deal: string;
}

const BaseBlockSmallInner: FC<IProps> = ({deal}) => {
  return (
    <section className='baseblock small__wrapper'>
      <div className="baseblock__small__wrapper">
        <IoAddCircleOutline size={25}/>
        <span>{deal}</span>
      </div>
    </section>
  )
};

export const BaseBlockSmall = React.memo(BaseBlockSmallInner);