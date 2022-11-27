import React, {
  useState
} from 'react';
import NavBar from 'src/components/_core/nav-bar';
import DefaultNavButtons from 'src/components/_core/nav-bar/default-nav-buttons';
import Footer from 'src/components/_core/footer';
import GroupDetailComponent from 'src/components/group-detail/group-detail';

const GroupDetail = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <DefaultNavButtons
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <GroupDetailComponent />
      <Footer />
    </div>
  );
};

export default GroupDetail;
