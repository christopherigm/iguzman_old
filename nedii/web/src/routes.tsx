/* eslint-disable max-lines-per-function */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from 'src/pages/home';
import About from 'src/pages/_core/about';
import ActivateUser from 'src/pages/_core/activate-user';
import ChangeLogPage from 'src/pages/_core/changelog';
import CreateAccount from 'src/pages/_core/create-account';
import LoginUser from 'src/pages/_core/login';
import Expos from 'src/pages/expos';
import ExpoDetail from 'src/pages/expo-detail';
import GroupDetail from 'src/pages/group-detail';
import StandDetail from 'src/pages/stand-detail';
import StandMeals from 'src/pages/stand-meals';
import StandProducts from 'src/pages/stand-products';
// import StandNewsDetail from 'src/pages/stand-news-detail';
import StandServices from 'src/pages/stand-services';
import StandVehicles from 'src/pages/stand-vehicles';
import StandRealEstate from 'src/pages/stand-real-estate';
import StanProductDetailPage from 'src/pages/stand-product-detail';
import StandMealDetail from 'src/pages/stand-meal-detail';
import StandServiceDetailPage from 'src/pages/stand-service-detail';
import StandVehicleDetailPage from 'src/pages/stand-vehicle-detail';
import StandRealEstateDetailPage from 'src/pages/stand-real-estate-detail';
import CategoriesGridPage from 'src/pages/categories-grid';
import SearchResultsPage from 'src/pages/_core/search-results';
import {
  TermsAndConditions,
  PrivacyPolicy,
  UserData
} from 'src/pages/_core/terms-and-conditions';
import UserAccountPage from 'src/pages/user-account';
import StandCardBusiness from 'src/pages/stand-card-business';

const AppRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/mi-cuenta/vehiculos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/inmuebles' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/platillos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/servicios' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/productos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/ventas' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/empresas' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/favoritos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/ordenes' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/carrito' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/pagos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/direcciones' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/configuracion' element={<UserAccountPage />} />
        <Route path='/mi-cuenta' element={<UserAccountPage />} />
        <Route path='/empresa/:standId/tarjeta-de-negocio' element={<StandCardBusiness />} />
        <Route path='/empresa/:standId/inmuebles/:realEstateId' element={<StandRealEstateDetailPage />} />
        <Route path='/empresa/:standId/vehiculos/:vehicleId' element={<StandVehicleDetailPage />} />
        <Route path='/empresa/:standId/servicios/:serviceId' element={<StandServiceDetailPage />} />
        {/* <Route path='/empresa/:standId/news/:standNewsId' element={<StandNewsDetail />} /> */}
        <Route path='/empresa/:standId/productos/:productId' element={<StanProductDetailPage />} />
        <Route path='/empresa/:standId/menu/:mealId' element={<StandMealDetail />} />
        <Route path='/empresa/:standId/inmuebles' element={<StandRealEstate />} />
        <Route path='/empresa/:standId/vehiculos' element={<StandVehicles />} />
        <Route path='/empresa/:standId/servicios' element={<StandServices />} />
        <Route path='/empresa/:standId/productos' element={<StandProducts />} />
        <Route path='/empresa/:standId/menu' element={<StandMeals />} />
        <Route path='/empresa/:standId' element={<StandDetail />} />
        <Route path='/categorias/:groupId' element={<GroupDetail />} />
        <Route path='/categorias' element={<CategoriesGridPage />} />
        <Route path='/expos/:expoId/:groupId' element={<GroupDetail />} />
        <Route path='/expos/:expoId' element={<ExpoDetail />} />
        <Route path='/expos' element={<Expos />} />
        <Route path='/buscador' element={<SearchResultsPage />} />
        <Route path='/activate/:token' element={<ActivateUser />} />
        <Route path='/about' element={<About />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/login' element={<LoginUser />} />
        <Route path='/changelog' element={<ChangeLogPage />} />
        <Route path='/terminos-y-condiciones' element={<TermsAndConditions />} />
        <Route path='/politica-de-privacidad' element={<PrivacyPolicy />} />
        <Route path='/uso-de-datos-de-usuario' element={<UserData />} />
        <Route path='/' element={<Home />} />
        <Route path='/index.html' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
