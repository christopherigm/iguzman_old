import React, {
  useState,
  useEffect
} from 'react';
import {
  useDispatch
} from 'react-redux';
import { Modal } from 'rrmc';
import SystemValues from 'src/constants/SystemValues';
import { CloseGlobalAlertDialog } from 'src/redux/actions/set-global-alert-dialog';

/* eslint-disable no-unused-vars */
export enum GlobalAlertSizeOptions {
  small = 'small',
  medium = 'medium',
  large = 'large'
}
/* eslint-enable no-unused-vars */

const GlobalAlertDialog = (): React.ReactElement => {
  const system = SystemValues.getInstance().system;
  const dispatch = useDispatch();
  const modelInterface = {
    open: () => null,
    close: () => null
  };
  const [modal, setModal] = useState(modelInterface);
  const onCloseEnd = () => {
    dispatch(CloseGlobalAlertDialog());
    modal.close();
  };

  useEffect(() => {
    modal.open();
  }, [modal]);

  return (
    <>
    {
      system && system.globalAlert && system.globalAlert.active ?
        <Modal
          setModal={setModal}
          success={system.globalAlert.success}
          title={system.globalAlert.title}
          message={system.globalAlert.message}
          onCloseEnd={onCloseEnd}
          size={system.globalAlert.size} /> : null
    }
    </>
  );
};

export default GlobalAlertDialog;
