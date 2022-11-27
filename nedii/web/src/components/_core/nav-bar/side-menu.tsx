import React from 'react';
import { Link } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import MenuItems from './menu-items';

const SideMenu = ( props: any ): React.ReactElement => {
  const user = SystemValues.getInstance().system.user;
  const profile = user.attributes.profile;

  return (
    <ul
      className='sidenav white Menu'
      id='mobile-demo'
      ref={props.sideNavRef}
      onClick={props.closeSideNav}>
      <div
        className={`SideNavBar__logo ${
          user.attributes.username ? 'SideNavBar__logo--signed-user-background' : ''
        }`}
        style={{
          backgroundImage: `url(${props.logo})`
        }}>
        {
          user.attributes.username ?
          <>
            <div
              className='SideNavBar__signed-user-background'
              style={{
                backgroundImage: `url(${props.logo})`
              }}></div>
            <Link
              to='/mi-cuenta'
              className='SideNavBar__signed-user-button'>
              <i className='z-depth-1' style={{
                backgroundImage: `url(${profile.img_picture ? profile.img_picture : ''})`
                }}></i>
              <span className='grey-text text-darken-3 truncate'>
                {user.attributes.first_name} {user.attributes.last_name}
              </span>
            </Link>
            <a
              className='SideNavBar__logout'
              onClick={props.logout}>
              <i className='material-icons  z-depth-1'>exit_to_app</i>
              <span className='grey-text text-darken-3'>Cerrar sesion</span>
            </a>
          </> : null
        }
      </div>
      <MenuItems
        sectionMenu={props.sectionMenu}
        logout={props.logout} />
    </ul>
  );
};

export default SideMenu;
