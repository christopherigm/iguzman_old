import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import StandDataLoader from 'src/components/stand/stand-data-loader';
import Footer from 'src/components/_core/footer';
// import StandNewDetail from 'src/modules/stand-detail/news/stand-new-detail';

const StandNewsDetail = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu] = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <StandDataLoader setSectionMenu={setSectionMenu} />
      {/* <StandNewDetail/> */}
      <Footer />
    </div>
  );
};

export default StandNewsDetail;
