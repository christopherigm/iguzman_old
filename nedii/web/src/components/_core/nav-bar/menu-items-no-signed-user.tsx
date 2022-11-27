import React from 'react';
import { MenuItem } from './menu-items';

const ItemsNoSignedUser = () : React.ReactElement => {
  return (
    <>
      <li className='Menu__item-with-icon Menu__item-with-sub-menu Menu__item-left-line hide-on-med-and-down'>
        <a
          className='grey-text text-darken-3'>
          <i className='material-icons'>account_circle</i>
          <span>Cuenta</span>
        </a>
        <div className='Menu__sub-menu z-depth-2'>
          <MenuItem
            to='/login'
            text='Login'
            icon='vpn_key' />
          <MenuItem
            to='/create-account'
            text='Crear cuenta'
            icon='add_circle_outline'
            leftLine={true} />
        </div>
      </li>
      <ul className='hide-on-large-only'>
        <li className='Menu__item-with-icon'>
          <MenuItem
            to='/login'
            text='Login'
            icon='vpn_key' />
        </li>
        <li className='Menu__item-with-icon'>
          <MenuItem
            to='/create-account'
            text='Crear cuenta'
            icon='add_circle_outline' />
        </li>
      </ul>
    </>
  );
};

export default ItemsNoSignedUser;
