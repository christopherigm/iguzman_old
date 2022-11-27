import React, {
  useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';

const About = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <HorizontalSpace size={SizesEnum.medium} />
      About
      <HorizontalSpace size={SizesEnum.large} />
      <Footer />
    </div>
  );
};

export default About;
