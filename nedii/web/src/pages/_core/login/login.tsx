import React, {
  useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import ParallaxHeaderImage from 'src/components/_core/parallax-header-image';
import EmailLogin from './email-login';

const Login = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const prefix = SystemValues.getInstance().system.platform.prefix;
  const headerPictureURL = `${prefix}/assets/login.jpg`;

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title='Login' />
      <div className='container row LoginUser'>
        <div className='col m1 l2'></div>
        <div className='col s12 m10 l8 row'>
          <div className='col s12'>
            <HorizontalSpace size={SizesEnum.medium} />
          </div>
          <EmailLogin />
        </div>
        <div className='col m1 l2'></div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

