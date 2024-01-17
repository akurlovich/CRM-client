import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Company } from './components/CompanyPage/Companies';
import { CompanyCard } from './components/CompanyPage/CompanyCard/CompanyCard';
import { Home } from './components/Home/Home';
import { OrdersPage } from './components/OrdersPage/OrdersMain';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import MainLayout from './components/RoutersComponents/MainLayout/MainLayout';
import './scss/app.scss';

const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path="companies" element={<Company />}/>
        <Route path="orders" element={<OrdersPage/>}/>
        <Route path="companies/:id" element={<CompanyCard/>}/>
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
