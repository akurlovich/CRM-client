import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import MainLayout from './components/RoutersComponents/MainLayout/MainLayout';
import './scss/app.scss';

const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}/>
        {/* <Route path="cart" element={<ProductsCart />}/>
        <Route path='admin' element={
          <AdminAuthRouter>
            <AddProduct/>
          </AdminAuthRouter> */}
        {/* }/> */}
        {/* <Route path="products" element={<ProductListItems/>}/> */}
        {/* <Route path="polikarbonat-main" element={<PolikarbonatMain/>}/>
        <Route path="polikarbonat" element={<ProductsBlock/>}/>
        <Route path="polikarbonat/:id" element={<ProductInfo/>}/>
        <Route path="shtaketnik" element={<PicketFenceBlock/>}/>
        <Route path="shtaketnik/:id" element={<PicketFenceInfo/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="*" element={<PageNotFound/>}/> */}
      </Route>
    </Routes>
  );
};

export default App;
