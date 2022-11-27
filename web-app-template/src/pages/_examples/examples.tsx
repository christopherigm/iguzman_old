import React, {
  useState
} from 'react';
import {
  HorizontalSpace,
  SubTitle,
  TextAlignEnum,
  SizesEnum
} from 'rrmc';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import { useDispatch } from 'react-redux';
import { OpenGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';

const Examples = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const dispatch = useDispatch();

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu} />
      <div className='container'>
        <HorizontalSpace size={SizesEnum.small} />
        <SubTitle
          text='Examples'
          fullWidth={true}
          align={TextAlignEnum.left} />
        <HorizontalSpace size={SizesEnum.small} />
        <a
          className='waves-effect waves-light btn'
          onClick={() => dispatch(OpenGlobalAlertDialog({
            dialog: 'global-alert-sample-ok'
          }))}>
          Global alert OK
        </a>
        <HorizontalSpace size={SizesEnum.x_small} />
        <a
          className='waves-effect waves-light btn'
          onClick={() => dispatch(OpenGlobalAlertDialog({
            dialog: 'global-alert-sample-fail'
          }))}>
          Global alert Fail
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Examples;
