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
import Resume from 'src/pages/resume-detail';
import PrivacyPolicy from 'src/pages/privacy';

const AppRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/examples' element={<Examples />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/changelog' element={<ChangeLog />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/detail/:username' element={<Resume />} />
        <Route path='/index.html' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
