/* eslint-disable max-lines-per-function */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from 'src/pages/home';
import Examples from 'src/pages/_examples';
import ChangeLog from 'src/pages/_core/changelog';
import Login from 'src/pages/_core/login';
import CreateAccount from 'src/pages/_core/create-account';

const AppRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/examples' element={<Examples />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/changelog' element={<ChangeLog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
