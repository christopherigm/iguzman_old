import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import CategoriesGrid from 'src/components/categories-grid';

const CategoriesGridPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <DefaultNavButtons
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <CategoriesGrid />
      <Footer />
    </div>
  );
};

export default CategoriesGridPage;
