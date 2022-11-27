import React, {
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import StandDataLoader from 'src/components/stand/stand-data-loader';
import StandProductDetail from 'src/components/stand-product-detail';

const StanProductDetailPage = (): React.ReactElement => {
  const params: any = useParams();
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const [stand, setStand]: any = useState(SystemValues.getInstance().system.standsById[params.standId]);

  return (
    <div className='page'>
      <NavBar
        sectionMenu={sectionMenu}
        setSectionMenu={setSectionMenu} />
      <StandDataLoader
        setSectionMenu={setSectionMenu}
        setStand={setStand}
        stand={stand} />
      {
        stand ? <StandProductDetail /> : null
      }
      <Footer />
    </div>
  );
};

export default StanProductDetailPage;
