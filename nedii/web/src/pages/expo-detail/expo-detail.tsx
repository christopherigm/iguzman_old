import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import ExpoDetailComponent from 'src/components/expo-detail/expo-detail';

const ExpoDetail = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <DefaultNavButtons
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <ExpoDetailComponent />
      <Footer />
    </div>
  );
};

export default ExpoDetail;
