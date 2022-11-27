import React, {
  useEffect,
  useState
} from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import { useParams } from 'react-router-dom';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import APISDK from 'src/api/api-sdk';

const ActivateUser = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const params: any = useParams();
  const [status, setStatus] = useState({
    success: false,
    message: ''
  });
  const token = params.token || null;

  useEffect(() => {
    APISDK.ActivateUser( token )
      .then((data: any) => {
        setStatus({
          success: data.success,
          message: 'Cuenta activada exitosamente'
        });
      })
      .catch(() => {
        setStatus({
          success: false,
          message: 'Error activando la cuenta'
        });
      });
  }, [APISDK]);

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <HorizontalSpace size={SizesEnum.large} />
      <p>{ status.success ? 'Cuenta activada correctamente' : status.message }</p>
      <Footer />
    </div>
  );
};

export default ActivateUser;
