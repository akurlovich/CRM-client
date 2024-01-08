import React, { FC } from 'react';
import './baseblock.scss';

const BaseBlockInner: FC = () => {
  return (
    <section className='baseblock'>BaseBlock</section>
  )
}

export const BaseBlock = React.memo(BaseBlockInner);