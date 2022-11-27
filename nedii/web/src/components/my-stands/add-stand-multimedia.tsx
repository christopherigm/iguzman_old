import React, {
  useState,
  useRef
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericImgInput,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import './add-stand-multimedia.scss';

const StandPicture = ( props: any ): React.ReactElement => {
  const item: any = props.item;

  return (
    <div className='col s4 m3'>
      <div className='AddStandMultimedia__picture GenericCard'
        style={{
          backgroundImage: `url(${item.attributes.img_picture})`
        }}>
        {
          !props.isLoading ?
          <i
            className='material-icons right white red-text AddStandMultimedia__delete-picture-button hoverable'
            onClick={(e: any) => {
              e.preventDefault();
              props.deleteStandPicture(Number(item.id));
            }}>delete</i> : null
        }
      </div>
    </div>
  );
};

const AddStandMultimedia = ( props: any ): React.ReactElement => {
  const formRef: any = useRef(null);
  const stand = props.stand && props.stand.id ? props.stand : null;
  const standId = stand ? Number(stand.id) : 0;
  const [newPicture, setNewPicture] = useState('');
  const pictures: Array<any> = stand ? stand.relationships.pictures.data : [];

  const deleteStandPicture = (pictureId: number) => {
    if ( props.isLoading ) return;
    props.setIsLoading(true);
    APISDK.DeleteStandPicture(pictureId, standId, pictures)
      .then(() => {
        return APISDK.GetSellerStands();
      })
      .then(() => {
        return APISDK.GetSellerStandsById(standId);
      })
      .then(() => {
        props.setIsLoading(false);
        setNewPicture('');
        formRef.current.reset();
      })
      .catch((error: any) => {
        console.log('error', error);
        props.setIsLoading(false);
      });
  };

  const addStandPicture = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return;
    props.setIsLoading(true);
    APISDK.AddStandPicture(newPicture, standId, pictures)
      .then(() => {
        return APISDK.GetSellerStands();
      })
      .then(() => {
        return APISDK.GetSellerStandsById(standId);
      })
      .then(() => {
        props.setIsLoading(false);
        formRef.current.reset();
      })
      .catch((error: any) => {
        console.log('error', error);
        props.setIsLoading(false);
      });
  };

  return (
    <>
    {
      stand ?
        <>
          {
            stand ?
              <>
              <HorizontalSpace size={SizesEnum.small} />
              <StrongText
                fullWidth={true}
                align={TextAlignEnum.left}
                text={`Editando fotos de ${stand.attributes.name}`} />
              </> : null
          }
          <HorizontalSpace size={SizesEnum.small} />
          <div className='row'>
          {
            pictures.map((i: any, index: number) => {
              return <StandPicture
                        item={i}
                        key={index}
                        deleteStandPicture={deleteStandPicture}
                        isLoading={props.isLoading}
                        setIsLoading={props.setIsLoading} />;
            })
          }
          </div>
          <form className='AddStandForm__form' onSubmit={addStandPicture} ref={formRef}>
            <GenericImgInput id='newImage' placeholder='Agregar imagen'
              disabled={props.isLoading} value={newPicture} setValue={setNewPicture} required={true} />
            <div className='input-field col s12 m6'>
              <input id='submit' type='submit'
                value='Guardar'
                className={`waves-effect waves-light btn right cyan ${ props.isLoading ? 'disabled' : ''}`}
                disabled={props.isLoading} />
            </div>
          </form>
        </> :
        <>Seleccione una empresa para continuar</>
    }
    </>
  );
};

export default AddStandMultimedia;
