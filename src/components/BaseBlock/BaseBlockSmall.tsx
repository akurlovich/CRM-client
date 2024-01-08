import React, { FC } from 'react';
import './baseblock.scss';

const BaseBlockSmallInner: FC = () => {
  return (
    <section className='baseblock small'>BaseBlockSmall</section>
  )
}

export const BaseBlockSmall = React.memo(BaseBlockSmallInner);