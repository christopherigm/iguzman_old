import React from 'react';
import { Link } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import ItemsSignedUser from './menu-items-signed-user';
import ItemsNoSignedUser from './menu-items-no-signed-user';

interface MenuItemInterface {
  to: string;
  text: string;
  icon?: string;
  leftLine?: boolean;
  rightLine?: boolean;
}

export const MenuItem = (props: MenuItemInterface): React.ReactElement => {
  return (
    <Link
      to={props.to}
      className={`Menu__item-with-icon grey-text text-darken-3 ${
        props.leftLine ? ' Menu__item-left-line' : ''
      } ${
        props.rightLine ? ' Menu__item-right-line' : ''
      }`}>
      {
        props.icon ?
        <>
          <i className='material-icons'>{props.icon}</i>
          <span>{props.text}</span>
        </> : <>{props.text}</>
      }
    </Link>
  );
};

interface MenuItemsInterface {
  sectionMenu: Array<MenuItemInterface>;
  logout: CallableFunction;
}

const MenuItems = ( props: MenuItemsInterface ): React.ReactElement => {
  const user = SystemValues.getInstance().system.user;

  return (
    <>
      {
        props.sectionMenu && props.sectionMenu.length ?
        <>
        {
          props.sectionMenu.map((i: any, index: number) => {
            return (
              <li key={index}>
                <MenuItem
                  to={i.to}
                  text={i.text}
                  icon={i.icon}
                  leftLine={i.leftLine}
                  rightLine={i.rightLine} />
              </li>
            );
          })
        }
        </> : null
      }
      {
        user.id ?
          <ItemsSignedUser logout={ props.logout } /> :
          <ItemsNoSignedUser />
      }
    </>
  );
};

export default MenuItems;
