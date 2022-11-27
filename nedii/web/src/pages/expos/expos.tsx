import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import ExpoGrid from 'src/components/expo-grid/expo-grid';

const Expos = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <DefaultNavButtons
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <ExpoGrid />
      <Footer />
    </div>
  );
};

export default Expos;
