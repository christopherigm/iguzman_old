import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import { CommonDocument } from 'rrmc';

export const TermsAndConditions = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <CommonDocument
        title='Terminos y condiciones'
        attr_key='terms_and_conditions' />
      <Footer />
    </div>
  );
};

export const PrivacyPolicy = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <CommonDocument
        title='Politica de privacidad'
        attr_key='privacy_policy' />
      <Footer />
    </>
  );
};

export const UserData = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <CommonDocument
        title='Politica de datos de usuario'
        attr_key='user_data' />
      <Footer />
    </>
  );
};
