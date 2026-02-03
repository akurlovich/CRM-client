import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CarriersMain } from './components/CarriersPage/CarriersMain';
import { Company } from './components/CompanyPage/Companies';
import { CompanyCard } from './components/CompanyPage/CompanyCard/CompanyCard';
import DealForDay from './components/DealsPage/DealsForDay/DealForDay';
import { DealsMain } from './components/DealsPage/DealsMain';
import { OrdersMain } from './components/OrdersPage/OrdersMain';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { AdminAuthRouter } from './components/RoutersComponents/AdminAuth/AdminAuthRouter';
import MainLayout from './components/RoutersComponents/MainLayout/MainLayout';
import { SettingsPage } from './components/SettingsPage/SettingsPage';
import { UserLogin } from './components/UserLogin/UserLogin';
import { UserRegistration } from './components/UserRegistration/UserRegistration';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import './scss/app.scss';
import { checkAuth } from './store/reducers/AuthReducer/AuthActionCreatores';
import { CarrierCard } from './components/CarriersPage/CarrierCard/CarrierCard';

const App: FC = () => {
  const { user } = useAppSelector(state => state.authReducer);
  // const auth = localStorage.getItem('isauth');

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAuth = async () => {
      try {
        if (localStorage.getItem('token') || localStorage.getItem('ref')) {
          if (isMounted) {
            await dispatch(checkAuth());
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAuth();

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, []);

  useEffect(() => {
    const keydownHandler = (event: MouseEvent) => {
      console.log(event.target)
    };
    document.addEventListener('click', keydownHandler);
    return () => document.removeEventListener('click', keydownHandler);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={user.isAdmin ? <Navigate to="/settings"/> : <Navigate to="/companies"/>}/>
        {/* <Route index element={<Navigate to="/settings"/>}/> */}
        <Route path='login' element={<UserLogin/>}/>
        <Route path='registration' element={<UserRegistration/>}/>
        
        <Route element={<AdminAuthRouter/>}>
          <Route path="settings" element={<SettingsPage/>}/>
          <Route path="companies" element={<Company/>}/>
          <Route path="companies/:id" element={<CompanyCard/>}/>
          <Route path="orders" element={<OrdersMain/>}/>
          <Route path="carriers" element={<CarriersMain/>}/>
          <Route path="carriers/:id" element={<CarrierCard/>}/>
          <Route path="deals" element={<DealsMain/>}/>
          <Route path="deals/:date" element={<DealForDay/>}/>
        </Route>

        {/* <Route path="orders" element={<OrdersMain/>}/>
        <Route path="deals" element={<DealsMain/>}/> */}
        {/* <Route path='admin' element={
          <AdminAuthRouter>
            <AddProduct/>
          </AdminAuthRouter> */}
        {/* }/> */}
        {/* <Route path="polikarbonat-main" element={<PolikarbonatMain/>}/>
        <Route path="polikarbonat" element={<ProductsBlock/>}/>
        <Route path="polikarbonat/:id" element={<ProductInfo/>}/>
        <Route path="shtaketnik" element={<PicketFenceBlock/>}/>
        <Route path="shtaketnik/:id" element={<PicketFenceInfo/>}/>
        <Route path="about" element={<About/>}/> */}
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
    </Routes>
  );
};

export default App;
