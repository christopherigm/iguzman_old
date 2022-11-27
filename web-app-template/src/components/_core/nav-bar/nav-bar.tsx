/* eslint-disable max-lines-per-function */
import React, {
  useRef
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as M from 'materialize-css';
import { StateInterface } from 'src/constants/SystemValues';
import SystemValues from 'src/constants/SystemValues';
import NavSearchBox from 'src/components/_core/nav-search-box/nav-search-box';
import DefaultNavButtons from './default-nav-buttons';
import SideMenu from './side-menu';
import MenuItems from './menu-items';
import SetSystemData from 'src/redux/actions/_core/system';
import './nav-bar.scss';

interface NavBarInterface {
  sectionMenu: Array<any>;
  setSectionMenu: CallableFunction;
  updateQuery?: CallableFunction;
}

const NavBar = (props: NavBarInterface): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const systemValues = SystemValues.getInstance();
  const logoURL = useSelector((state: StateInterface) => state.system.configurations.img_logo);
  const sideNavRef: any = useRef(null);

  const closeSideNav = () => {
    const sideNav = M.Sidenav.getInstance(sideNavRef.current);
    sideNav.close();
  };

  const logout = (e: any) => {
    e.preventDefault();
    dispatch(SetSystemData({
      accessToken: '',
      refreshToken: '',
      profile: {
        id: 0
      },
      user: {
        id: 0,
        attributes: {
          profile: {
            id: 0
          }
        }
      }
    }));
    return navigate('/');
  };

  return (
    <>
      <DefaultNavButtons
        sectionMenu={props.sectionMenu}
        setSectionMenu={props.setSectionMenu} />
      <div className='navbar-fixed'>
        <nav className='NavBar white black-text'>
          <div className='nav-wrapper container'>
            <Link to='/' className='brand-logo left Logo'
              style={{
                backgroundImage: `url(${logoURL})`
              }}>
            </Link>
            {
              systemValues.searchAvailable ?
                <NavSearchBox updateQuery={props.updateQuery} /> : null
            }
            <a href='#'
              data-target='mobile-demo'
              className={`sidenav-trigger ${systemValues.primaryColorName}-text right`}>
              <i className='material-icons'>menu</i>
            </a>
            <ul
              id='nav-mobile'
              className='right hide-on-med-and-down Menu'>
              <MenuItems
                logout={logout}
                sectionMenu={props.sectionMenu} />
            </ul>
          </div>
        </nav>
      </div>
      <SideMenu
        sideNavRef={sideNavRef}
        closeSideNav={closeSideNav}
        logout={logout}
        sectionMenu={props.sectionMenu}
        logo={logoURL} />
    </>
  );
};

export default NavBar;
