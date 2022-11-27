import React, {
  useEffect,
  useState
} from 'react';
import { Link } from 'react-router-dom';
import * as M from 'materialize-css';
import { LoadingIndicator } from 'rrmc';
import { useSelector } from 'react-redux';
import { StateInterface } from 'src/constants/SystemValues';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import SystemCheck from 'src/components/_core/system-check';
import GlobalAlertDialog from 'src/components/_core/global-alert-dialog';
import './footer.scss';

const Footer = (): React.ReactElement => {
  const [system, setSystem] = useState(SystemValues.getInstance().system);
  const isLoading = useSelector((state: StateInterface) => state.system.isLoading.length ? true : false);
  const isMobileApp = SystemValues.getInstance().isMobileApp;

  useEffect(() => {
    APISDK.GetSystemConfigurations()
      .then(() => {
        setSystem(SystemValues.getInstance().system);
      })
      .catch((data: any) => {
        console.log(data);
      });
  }, [APISDK]);

  return (
    <>
    <LoadingIndicator isLoading={isLoading} />
    <SystemCheck />
    <GlobalAlertDialog />
    <div className='Footer__flex-filler'></div>
    <footer className={`page-footer ${SystemValues.getInstance().primaryColorName} darken-2 Footer`}>
      <div className='footer-copyright Footer__copyright'>
        <div className='container Footer__info'>
          <div className='Footer__version'>
            <span onClick={() => {
              M.toast({
                html: `(${system.platform.os} - ${SystemValues.getInstance().branchName})`,
                classes: 'rounded'
              });
            }}>V {SystemValues.getInstance().version}&nbsp;</span>
            { !isMobileApp && SystemValues.getInstance().appEnabled ?
              <a
                href='/static/app.apk'
                className='white-text Footer__app'>
                <span>-&nbsp;</span>
                <i className='material-icons'>android</i>
              </a> : null
            }
            &nbsp;-&nbsp;
            {
              SystemValues.getInstance().changelogEnabled ?
                <Link
                  to='/changelog'
                  className='white-text Footer__app'>
                  <i className='material-icons'>access_time</i>
                </Link> : null
            }
          </div>
          <span className='white-text'>With ♥ by&nbsp;
            <a href='https://github.com/GMR027'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Edgar
            </a>
            &nbsp;&&nbsp;
            <a href='https://github.com/christopherigm'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Chris
            </a>
            &nbsp;G.
          </span>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
