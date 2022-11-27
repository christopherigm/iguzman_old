import React, {
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import {
  HorizontalSpace,
  StrongText,
  TextAlignEnum,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import './user-dashboard.scss';

const UserDashboardItemCard = (props: any): React.ReactElement => {
  return (
    <div className='UserDashboard__item-card col s6'>
      <Link to={props.to} className='white hoverable'>
        <i className={`material-icons UserDashboard__item-card-icon ${props.color}-text`}>
          {props.icon}
        </i>
        <span className={`UserDashboard__item-card-label ${props.color}-text text-darken-2 truncate`}>
          {props.label}
        </span>
      </Link>
    </div>
  );
};

const UserDashboard = (): React.ReactElement => {
  const profile = SystemValues.getInstance().system.profile;
  const stands = SystemValues.getInstance().system.favoriteStands;
  const items = SystemValues.getInstance().system.favoriteItems;
  const cartItems = SystemValues.getInstance().system.cart;
  const userAddress = SystemValues.getInstance().system.addresses;
  const userStands = SystemValues.getInstance().system.sellerStands;

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    APISDK.GetNediiCartItems();
    APISDK.GetNediiFavoriteItems();
    APISDK.GetUserAddress();
    APISDK.GetFavoriteStands();
    APISDK.GetSellerStands();
  }, [window]);

  return (
    <div className='col s12 m8 UserDashboard'>
      <StrongText
        text='Panel de usuario'
        fullWidth={true}
        align={TextAlignEnum.left} />
      <p>Informacion general de la cuenta y estadisticas.</p>
      <div className='row'>
        <UserDashboardItemCard icon='store' color='blue'
          to='/mi-cuenta/favoritos'
          label={`${stands.length} Empresas favoritas`} />
        <UserDashboardItemCard icon='favorite' color='red'
          to='/mi-cuenta/favoritos'
          label={`${items.length} elemetos favoritos`} />
        <UserDashboardItemCard icon='payment' color='indigo'
          to='/mi-cuenta/pagos'
          label={`${0} formas de pago`} />
        <UserDashboardItemCard icon='recent_actors' color='green'
          to='/mi-cuenta/direcciones'
          label={`${userAddress.length} direcciones de entrega`} />
        <UserDashboardItemCard icon='shopping_cart' color='deep-purple'
          to='/mi-cuenta/carrito'
          label={`${cartItems.length} elementos en el carrito`} />
        <UserDashboardItemCard icon='access_time' color='teal'
          to='/mi-cuenta/ordenes'
          label={`${0} ordenes pasadas`} />
      </div>
      {
        profile && profile.attributes.is_seller ?
        <>
        <HorizontalSpace size={SizesEnum.x_small} />
        <StrongText
          text='Panel de vendedor'
          fullWidth={true}
          align={TextAlignEnum.left} />
        <p>Informacion y estadisticas del perfil de vendedor.</p>
        <div className='row'>
          <UserDashboardItemCard icon='store' color='blue'
            to='/mi-cuenta/empresas'
            label={`${userStands.length} Empresas`} />
          <UserDashboardItemCard icon='attach_money' color='green'
            to='/mi-cuenta/ventas'
            label={`${0} ventas`} />
          <UserDashboardItemCard icon='watch' color='red'
            to='/mi-cuenta/productos'
            label={`${0} productos`} />
          <UserDashboardItemCard icon='business' color='indigo'
            to='/mi-cuenta/servicios'
            label={`${0} servicios`} />
          <UserDashboardItemCard icon='directions_car' color='teal'
            to='/mi-cuenta/vehiculos'
            label={`${0} vehiculos`} />
          <UserDashboardItemCard icon='local_pizza' color='deep-orange'
            to='/mi-cuenta/platillos'
            label={`${0} platillos`} />
          <UserDashboardItemCard icon='home' color='deep-purple'
            to='/mi-cuenta/inmuebles'
            label={`${0} inmuebles`} />
        </div>
        </> : null
      }
    </div>
  );
};

export default UserDashboard;
