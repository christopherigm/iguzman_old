import React, {
  useState
} from 'react';
import { useSelector } from 'react-redux';
import {
  LoadingIndicator,
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import ParallaxHeaderImage from 'src/components/_core/parallax-header-image';
import EmailRegistration from './email-registration';
import './register-user.scss';

const CreateAccount = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}/assets/register.jpg`;

  return (
    <div className='page'>
      <LoadingIndicator isLoading={isLoading} />
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title='Registro' />
      <div className='container row RegisterUser'>
        <div className='col m1 l2'></div>
        <div className='col s12 m10 l8 row'>
          <div className='col s12'>
            <HorizontalSpace size={SizesEnum.medium} />
          </div>
          <EmailRegistration isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <div className='col m1 l2'></div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;

