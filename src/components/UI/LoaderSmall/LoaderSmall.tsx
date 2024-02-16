import React from 'react'
import './loadersmall.scss';

function LoaderSmallInner() {
  return (
    <div className='loader-small__wrapper'>
      <div className='loader-small'></div>
    </div>
  )
};

export const LoaderSmall = React.memo(LoaderSmallInner)
