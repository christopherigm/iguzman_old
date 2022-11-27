import React from 'react';
import { Link } from 'react-router-dom';
import { StrongText } from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import './user-account-menu.scss';
import MenuItemsJSON from './menu-items.json';
import SellerMenuItemsJSON from './seller-menu-items.json';

const AccountMenuItem = (props: any): React.ReactElement => {
  const pathname = window.location.pathname || '';

  return (
    <li>
      <Link to={props.item.path}
        className={`UserAccount__menu-item UserAccount__menu-item${pathname === props.item.path ? '--selected' : ''}`}>
        {props.item.text}
      </Link>
    </li>
  );
};

const UserAccountMenu = (): React.ReactElement => {
  const user = SystemValues.getInstance().system.user;
  const profile = user.attributes.profile;

  return (
    <div className='col s12 m3'>
      <div
        className='UserAccount__profile-image z-depth-2'
        style={{
          backgroundImage: `url(${profile.img_picture})`
        }}></div>
      <StrongText
        text={`Hola ${user.attributes.first_name} ${user.attributes.last_name}`}
        fullWidth={true} />
      <ul className='UserAccount__list'>
        {
          MenuItemsJSON.map((i: any, index: number) => {
            return <AccountMenuItem key={index} item={i} />;
          })
        }
      </ul>
      {
        profile && profile.is_seller ?
          <ul className='UserAccount__list'>
            {
              SellerMenuItemsJSON.map((i: any, index: number) => {
                return <AccountMenuItem key={index} item={i} />;
              })
            }
          </ul> : null
      }
    </div>
  );
};

export default UserAccountMenu;
