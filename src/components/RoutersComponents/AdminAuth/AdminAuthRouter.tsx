import React, { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux';
// import { ADMIN_ROLE } from '../../../constants/user';
// import { useAppSelector } from '../../../hooks/redux';

interface IProps {
  // children: JSX.Element;
}

const AdminAuthRouterInner: FC<IProps> = ({}) => {
  const location = useLocation();
  // const { isAuth } = useAppSelector(state => state.authReducer);
  const auth = localStorage.getItem('isauth');
  // console.log('first', auth)
  // const isAuth = 'admin';
  // const role = 'admin';
  //@ts-ignore
  if (auth !== 'true') {
    return <Navigate to='/login' state={location.pathname} replace/>
    // return <Navigate to='/login' state={{from: location.pathname}}/>
  }

  return <Outlet />;
};

export const AdminAuthRouter = React.memo(AdminAuthRouterInner);