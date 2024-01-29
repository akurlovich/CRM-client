import React, { FC, useState } from 'react';
import './baseblock.scss';
import { IoAddCircleOutline } from "@react-icons/all-files/io5/IoAddCircleOutline";

interface IProps {
  deal: string;
  isVisible?: boolean;
  showAddOrder: () => void;
}

const BaseBlockSmallInner: FC<IProps> = ({deal, isVisible, showAddOrder}) => {
  const [showBlock, setShowBlock] = useState(true);

  const showHandler = () => {
    showAddOrder();
    setShowBlock(false);
  }
  return (
    <>
      {isVisible &&
        <section className='baseblock small__wrapper'>
          <div
            onClick={showHandler} 
            className="baseblock__small__wrapper">
            <IoAddCircleOutline size={25}/>
            <span>{deal}</span>
          </div>
        </section>
      } 
    </>
  )
    
};

export const BaseBlockSmall = React.memo(BaseBlockSmallInner);