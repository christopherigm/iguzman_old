/* eslint-disable max-lines-per-function */
import React from 'react';
import { Link } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import { MenuItem } from './menu-items';

const ItemsSignedUser = ( props: any ): React.ReactElement => {
  const user = SystemValues.getInstance().system.user;
  const profile = user.attributes.profile;

  return (
    <>
      <li className='Menu__item-with-icon Menu__item-left-line Menu__item-with-sub-menu hide-on-med-and-down'>
        <a
          className={'grey-text text-darken-3 hide-on-med-and-down'}>
          <i className='material-icons'
            style={{
              backgroundImage: `url(${ profile.img_picture ? profile.img_picture : '' })`
            }}>{ !profile.img_picture ? 'account_circle' : '' }</i>
          <span>{user.attributes.first_name}</span>
        </a>
        <div className='Menu__sub-menu z-depth-2'>
          <Link
            to='/mi-cuenta/ordenes'
            className='grey-text text-darken-3 Menu__item-with-icon'>
            <i className='material-icons'>history</i>
            <span>Ordenes</span>
          </Link>
          <Link
            to='/mi-cuenta/favoritos'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>favorite</i>
            <span>Favoritos</span>
          </Link>
          <Link
            to='/mi-cuenta/carrito'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>shopping_cart</i>
            <span>Carrito</span>
          </Link>
          <Link
            to='/mi-cuenta'
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'>
            <i className='material-icons'>account_circle</i>
            <span>Cuenta</span>
          </Link>
          <a
            className='grey-text text-darken-3 Menu__item-with-icon Menu__item-left-line'
            onClick={props.logout}>
            <i className='material-icons'>exit_to_app</i>
            <span>Cerrar sesion</span>
          </a>
        </div>
      </li>
      <ul className='hide-on-large-only'>
        <MenuItem
          to='/mi-cuenta/carrito'
          text='Carrito'
          icon='shopping_cart' />
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/carrito'
            className='grey-text text-darken-3'>
            <i className='material-icons'>shopping_cart</i>
            <span>Carrito</span>
          </Link>
        </li>
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/favoritos'
            className='grey-text text-darken-3'>
            <i className='material-icons'>favorite</i>
            <span>Favoritos</span>
          </Link>
        </li>
        <li className='Menu__item-with-icon'>
          <Link
            to='/mi-cuenta/ordenes'
            className='grey-text text-darken-3'>
            <i className='material-icons'>history</i>
            <span>Ordenes</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ItemsSignedUser;
