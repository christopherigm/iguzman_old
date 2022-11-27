import React, {
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import StandDataLoader from 'src/components/stand/stand-data-loader';
import StandVehiclesGrid from 'src/components/stand-vehicles-grid';

const StandVehicles = (): React.ReactElement => {
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
        stand ? <StandVehiclesGrid stand={stand} /> : null
      }
      <Footer />
    </div>
  );
};

export default StandVehicles;
