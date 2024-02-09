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
  const isAuth = 'admin';
  const role = 'admin';
  //@ts-ignore
  if (isAuth !== role) {
    return <Navigate to='/login' state={location.pathname} replace/>
    // return <Navigate to='/login' state={{from: location.pathname}}/>
  }

  return <Outlet />;
};

export const AdminAuthRouter = React.memo(AdminAuthRouterInner);