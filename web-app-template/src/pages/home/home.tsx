import React, {
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import SystemValues from 'src/constants/SystemValues';

const Home = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const hostname = SystemValues.getInstance().hostname;

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <div className='container'>
        <HorizontalSpace size={SizesEnum.small} />
        <SubTitle
          text={ hostname ? `Hello World from pod: ${hostname}!` : 'Hello World!' }
          fullWidth={true}
          align={TextAlignEnum.left} />
        <HorizontalSpace size={SizesEnum.small} />
        <Link to='/examples'>Samples</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
