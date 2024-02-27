import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Company } from './components/CompanyPage/Companies';
import { CompanyCard } from './components/CompanyPage/CompanyCard/CompanyCard';
import DealForDay from './components/DealsPage/DealsForDay/DealForDay';
import { DealsMain } from './components/DealsPage/DealsMain';
import { OrdersMain } from './components/OrdersPage/OrdersMain';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { AdminAuthRouter } from './components/RoutersComponents/AdminAuth/AdminAuthRouter';
import MainLayout from './components/RoutersComponents/MainLayout/MainLayout';
import { UserLogin } from './components/UserLogin/UserLogin';
import { UserRegistration } from './components/UserRegistration/UserRegistration';
import { useAppDispatch } from './hooks/redux';
import './scss/app.scss';
import { checkAuth } from './store/reducers/AuthReducer/AuthActionCreatores';

const App: FC = () => {

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

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/companies"/>}/>
        {/* <Route index element={<UserLogin/>}/> */}
        <Route path='login' element={<UserLogin/>}/>
        <Route path='registration' element={<UserRegistration/>}/>
        
        <Route element={<AdminAuthRouter/>}>
          <Route path="companies" element={<Company/>}/>
          <Route path="companies/:id" element={<CompanyCard/>}/>
          <Route path="orders" element={<OrdersMain/>}/>
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
