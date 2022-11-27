import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import SubTitle from '../sub-title/sub-title';
import './modal.scss';

interface ModalInterface {
  setModal: CallableFunction;
  success: boolean;
  title: string;
  message: string;
  onCloseEnd: any;
  size?: string;
  fixedFooter?: boolean;
};

const Modal = ( props: ModalInterface ): React.ReactElement => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    if ( modalRef && modalRef.current ) {
      const instance = M.Modal.init(modalRef.current, {
        opacity: 0.5,
        preventScrolling: false,
        onCloseEnd: props.onCloseEnd
      });
      props.setModal(instance);
    }
  }, [M]);

  return (
    <>
      <div className={`modal ${props.fixedFooter ? 'modal-fixed-footer' : ''} Modal ${props.size ? `Modal--${props.size}` : ''}`} ref={modalRef}>
        <div className='modal-content'>
          <SubTitle
            text={props.title}
            color={ props.success ? '#4caf50' : '#e53935' } />
          <div
            className='black-text'
            dangerouslySetInnerHTML={{__html: props.message}}></div>
        </div>
        <div className='modal-footer'>
          <div
            onClick={props.onCloseEnd}
            className={`modal-close ${ props.success ? 'green' : 'red darken-1' } white-text waves-effect waves btn`}>
            Aceptar
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
