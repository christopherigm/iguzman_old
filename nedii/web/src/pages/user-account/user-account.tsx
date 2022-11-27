import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';
import UserAccountMenu from 'src/components/user-account-menu';
import UserDashboard from 'src/components/user-dashboard';
import UserFavorites from 'src/components/user-favorites';
import UserCart from 'src/components/user-cart';
import UserAccountConfigurations from 'src/components/user-account-configurations';
import UserAddress from 'src/components/user-address';
import MyStands from 'src/components/my-stands';
import MyProducts from 'src/components/my-products';
import SystemValues from 'src/constants/SystemValues';

const UserAccountPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const dispatch = useDispatch();
  const user = SystemValues.getInstance().system.user;
  const pathname = window.location.pathname || '';

  useEffect(() => {
    const user = SystemValues.getInstance().system.user;
    if ( !user || !user.id ) {
      dispatch(OpenGlobalAlertDialog({
        dialog: 'missingLogin'
      }));
    }
  });

  return (
    <>
    {
      !user || !user.id ?
      <div className='page'>
        <NavBar
          sectionMenu={sectionMenu}
          setSectionMenu={setSectionMenu} />
        <DefaultNavButtons
          sectionMenu={sectionMenu}
          setSectionMenu={setSectionMenu} />
        <HorizontalSpace size={SizesEnum.medium} />
        Por favor inicie sesion
        <HorizontalSpace size={SizesEnum.medium} />
        <Footer />
      </div> :
      <div className='page'>
        <NavBar
          sectionMenu={sectionMenu}
          setSectionMenu={setSectionMenu} />
        <DefaultNavButtons
          sectionMenu={sectionMenu}
          setSectionMenu={setSectionMenu} />
        <HorizontalSpace size={SizesEnum.small} />
        <div className='container row UserAccount'>
          <UserAccountMenu />
          <div className='col s12 m1 hide-on-med-and-down'></div>
          { pathname === '/mi-cuenta' ? <UserDashboard /> : null }
          { pathname === '/mi-cuenta/favoritos' ? <UserFavorites /> : null }
          { pathname === '/mi-cuenta/carrito' ? <UserCart /> : null }
          { pathname === '/mi-cuenta/configuracion' ? <UserAccountConfigurations /> : null }
          { pathname === '/mi-cuenta/direcciones' ? <UserAddress /> : null }
          { pathname === '/mi-cuenta/empresas' ? <MyStands /> : null }
          { pathname === '/mi-cuenta/productos' ?
            <MyProducts
              itemType='Product'
              itemClassificacionType='ProductClassification' />
            : null }
          { pathname === '/mi-cuenta/servicios' ?
            <MyProducts
              itemType='Service'
              itemClassificacionType='ServiceClassification' />
            : null }
          { pathname === '/mi-cuenta/platillos' ?
            <MyProducts
              itemType='Meal'
              itemClassificacionType='MealClassification' />
            : null }
          { pathname === '/mi-cuenta/vehiculos' ?
            <MyProducts
              itemType='Vehicle'
              itemClassificacionType='VehicleClassification' />
            : null }
          { pathname === '/mi-cuenta/inmuebles' ?
            <MyProducts
              itemType='RealEstate'
              itemClassificacionType='RealEstateClassification' />
            : null }
          {/* { pathname === '/mi-cuenta/servicios' ? <MyServices /> : null }
          { pathname === '/mi-cuenta/platillos' ? <MyMeals /> : null }
          { pathname === '/mi-cuenta/vehiculos' ? <MyVehicles /> : null }
          { pathname === '/mi-cuenta/inmuebles' ? <MyRealEstates /> : null } */}
        </div>
        <Footer />
      </div>
    }
    </>
  );
};

export default UserAccountPage;
