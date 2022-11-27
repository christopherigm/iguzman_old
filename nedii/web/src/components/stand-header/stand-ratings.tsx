import React, {
  useState
} from 'react';
import {
  Modal,
  Ratings,
  SizesEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';

const StandRatings = (props: any): React.ReactElement => {
  const modelInterface = {
    open: () => null,
    close: () => null
  };
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
  };

  const starCB = (e: any) => {
    APISDK.PostStandRating(Number(e), Number(props.standId))
      .then(() => {
        const rating = e;
        setModalSuccess(true);
        setModalTitle('Puntuaciones');
        setModaMessage(`Usted ha puntuado el stand con <b>${rating}</b> estrella${rating === 1 ? '' : 's'}.<br/><br/>Gracias.`);
        modal.open();
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <Modal
        setModal={setModal}
        success={modalSuccess}
        title={modalTitle}
        message={modalMessage}
        onCloseEnd={onCloseEnd} />
      <Ratings
        score={props.averageRating}
        size={SizesEnum.xxx_large}
        onClick={starCB}
        tooltip={`Promedio: ${props.averageRating}`} />
    </>
  );
};

export default StandRatings;
