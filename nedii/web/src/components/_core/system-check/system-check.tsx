import React, {
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SystemValues, {
  FILE_PREFIX
} from 'src/constants/SystemValues';
import SetSystemData from 'src/redux/actions/_core/system';
import * as M from 'materialize-css';

const SystemCheck = (): React.ReactElement => {
  const system = SystemValues.getInstance().system;
  const user = SystemValues.getInstance().system.user;
  const isMobileApp = SystemValues.getInstance().isMobileApp;
  const dispatch = useDispatch();
  const navigate: any = useNavigate();

  useEffect(() => {
    const w: any = window;
    M.AutoInit();
    w.scrollTo(0, 0);
    if ( isMobileApp ) {
      w.document.addEventListener('deviceready', () => {
        // window.alert('Device ready! 1');
        if ( w.device ) {
          const os: string = w.device.platform;
          let prefix = '';
          if ( os === 'Android' ) {
            prefix = FILE_PREFIX.ANDROID;
          }
          dispatch(SetSystemData({
            platform: {
              os: os,
              prefix: prefix
            }
          }));
        }
      });
    } else {
      const pathname = window.location.pathname || '';
      if ((pathname === '/login' ||
        pathname === '/create-account') &&
        system.accessToken && user.id) {
        navigate('/');
      }
    }
  }, [M, window]);

  return (
    <></>
  );
};

export default SystemCheck;
