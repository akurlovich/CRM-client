import React, { FC } from 'react';
import './usererrorwarning.scss';
import { IoAlertCircle } from "@react-icons/all-files/io5/IoAlertCircle";

interface IProps {
  message?: string,
  canselHandler?: () => void;
}

const UserErrorWarningInner: FC<IProps> = ({message, canselHandler}) => {
  
  return (
    <div className="user-error">
      <div className='user-error__wrapper'>
        <div className="user-error__title">
          <IoAlertCircle 
            size={40}
            color={'red'}
            />
          <span>Что-то пошло не так, обратитесь к администратору.</span>
          <span>{message ? message : ''}</span>
        </div>
        <button
          onClick={canselHandler}
          className='user-error__button'>На главную</button>
      </div>
    </div>
  )
};

export const UserErrorWarning = React.memo(UserErrorWarningInner);
