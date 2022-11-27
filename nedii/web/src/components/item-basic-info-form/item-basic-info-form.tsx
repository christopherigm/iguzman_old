/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericTextInput,
  GenericImgInput,
  GenericTextArea,
  GenericCheckboxInput,
  GenericSelectInput,
  LoadingIndicator,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';

const AddItemBasicInfo = ( props: any ): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef: any = useRef(null);
  const item = props.item && props.item.id ? props.item : null;
  const [name, setName] = useState('');
  const [stand, setStand] = useState('');
  const [classification, setClassification] = useState('');
  const [imgPicture, setImgPicture] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [model, setModel] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [publishOnTheWall, setPublishOnTheWall] = useState(false);
  let cName = '';
  let cStand = '';
  let cClassification = '';
  let cPrice = '';
  let cYear = '';
  const cModel = null;
  let cDiscount = '';
  let cDescription = '';
  let cShortDescription = '';
  let cPublishOnTheWall = '';
  if ( item && item.attributes ) {
    if ( item.attributes.name ) cName = item.attributes.name;
    if ( item.attributes.price ) cPrice = item.attributes.price;
    if ( item.attributes.year ) cYear = item.attributes.year;
    if ( item.attributes.discount ) cDiscount = item.attributes.discount;
    if ( item.attributes.description ) cDescription = item.attributes.description;
    if ( item.attributes.short_description ) cShortDescription = item.attributes.short_description;
    if ( item.attributes.publish_on_the_wall ) cPublishOnTheWall = item.attributes.publish_on_the_wall;
  }
  if ( item && item.relationships ) {
    if ( item.relationships.stand &&
      item.relationships.stand.data &&
      item.relationships.stand.data.id ) {
      cStand = item.relationships.stand.data.id;
    }
    if ( item.relationships.classification &&
      item.relationships.classification.data &&
      item.relationships.classification.data.id ) {
      cClassification = item.relationships.classification.data.id;
    }
  }
  const userStands = SystemValues.getInstance().system.sellerStands;
  let itemClassifications: Array<any> = [];

  useEffect(() => {
    setIsLoading(true);
    if ( props.itemType === 'Product' ) {
      APISDK.GetProductClassifications()
        .finally(() => {
          setIsLoading(false);
        });
    }
    if ( props.itemType === 'Service' ) {
      APISDK.GetServiceClassifications()
        .finally(() => {
          setIsLoading(false);
        });
    }
    if ( props.itemType === 'Meal' ) {
      APISDK.GetMealClassifications()
        .finally(() => {
          setIsLoading(false);
        });
    }
    if ( props.itemType === 'Vehicle' ) {
      APISDK.GetVehicleClassifications()
        .finally(() => {
          setIsLoading(false);
        });
    }
    if ( props.itemType === 'RealEstate' ) {
      APISDK.GetRealEstateClassifications()
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [APISDK]);

  const getStands = (): Array<any> => {
    const items: Array<any> = [];
    userStands.forEach((i: any) => {
      items.push({
        value: Number(i.id),
        text: i.attributes.name
      });
    });
    return items;
  };

  if ( props.itemType === 'Product' ) {
    itemClassifications = SystemValues.getInstance().system.productClassifications;
  }
  if ( props.itemType === 'Service' ) {
    itemClassifications = SystemValues.getInstance().system.serviceClassifications;
  }
  if ( props.itemType === 'Meal' ) {
    itemClassifications = SystemValues.getInstance().system.mealClassifications;
  }
  if ( props.itemType === 'Vehicle' ) {
    itemClassifications = SystemValues.getInstance().system.vehicleClassifications;
  }
  if ( props.itemType === 'RealEstate' ) {
    itemClassifications = SystemValues.getInstance().system.realEstateClassifications;
  }

  const getClassifications = (): Array<any> => {
    const items: Array<any> = [];
    for (let i = 0; i < itemClassifications.length; i++) {
      const e = itemClassifications[i];
      if ( stand &&
        e.relationships &&
        e.relationships.stand &&
        e.relationships.stand.data &&
        e.relationships.stand.data.id &&
        e.relationships.stand.data.id === stand ) {
        items.push({
          value: Number(e.id),
          text: e.attributes.name
        });
      } else if ( props.itemType === 'Vehicle' ) {
        items.push({
          value: Number(e.id),
          text: e.attributes.name
        });
      }
    }
    return items;
  };

  const addItem = (e: any) => {
    e.preventDefault();
    if ( isLoading ) return;
    setIsLoading(true);
    if ( item ) {
      const itemToUpdate: any = {
        id: item.id,
        itemType: props.itemType,
        itemClassificacionType: props.itemClassificacionType
      };
      if ( name ) itemToUpdate.name = name;
      if ( stand ) itemToUpdate.stand = Number(stand);
      if ( classification ) itemToUpdate.classification = Number(classification);
      if ( imgPicture ) itemToUpdate.img_picture = imgPicture;
      if ( price ) itemToUpdate.price = price;
      if ( discount ) itemToUpdate.discount = discount;
      if ( description ) itemToUpdate.description = description;
      if ( shortDescription ) itemToUpdate.short_description = shortDescription;
      if ( publishOnTheWall ) itemToUpdate.publish_on_the_wall = publishOnTheWall;
      APISDK.UpdateBuyableItem(itemToUpdate)
        .then((response: any) => {
          props.setItem(response);
          return APISDK.GetSellerProducts();
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          setIsLoading(false);
        });
    } else {
      const itemToCreate: any = {
        itemClassificacionType: props.itemClassificacionType,
        itemType: props.itemType,
        name: name ? name : cName,
        short_description: shortDescription,
        description: description,
        stand: Number(stand),
        classification: Number(classification),
        img_picture: imgPicture,
        price: Number(price),
        discount: Number(discount),
        publish_on_the_wall: Boolean(publishOnTheWall)
      };
      if ( props.itemType === 'Vehicle' ) {
        itemToCreate.year = year ? year : cYear;
        itemToCreate.model = 1 || model;
        itemToCreate.slug = `${year}-ford-red-car`;
      }
      APISDK.AddBuyableItem(itemToCreate)
        .then(() => {
          if ( props.itemType === 'Product' ) {
            return APISDK.GetSellerProducts();
          }
          if ( props.itemType === 'Service' ) {
            return APISDK.GetSellerServices();
          }
          if ( props.itemType === 'Meal' ) {
            return APISDK.GetSellerMeals();
          }
          if ( props.itemType === 'Vehicle' ) {
            return APISDK.GetSellerVehicles();
          }
          if ( props.itemType === 'RealEstate' ) {
            return APISDK.GetSellerRealEstates();
          }
        })
        .then(() => {
          setIsLoading(false);
          props.setValueReference('step-1');
        })
        .catch((error: any) => {
          console.log('error', error);
          setIsLoading(false);
        });
    }
  };

  return (
  <>
    <LoadingIndicator isLoading={isLoading} />
    {
      !item ? <StrongText
                text='Informacion basica'
                fullWidth={true}
                align={TextAlignEnum.left} /> :
        <>
        <HorizontalSpace size={SizesEnum.small} />
        <StrongText
          fullWidth={true}
          align={TextAlignEnum.left}
          text={`Editando ${item.attributes.name}`} />
        </>
    }
    <form className='AddStandForm__form' onSubmit={addItem} ref={formRef}>
      <div className='input-field col s12 AddStandForm__sub-title'>
        <b>Informacion basica</b>
      </div>
      <GenericSelectInput id='stand' placeholder='Empresa'
        items={getStands()} disabled={isLoading} value={cStand}
        setValue={setStand} required={item ? false : true}
        onChange={() => {
          if ( props.itemType === 'Product' ) {
            itemClassifications = SystemValues.getInstance().system.productClassifications;
          }
          if ( props.itemType === 'Service' ) {
            itemClassifications = SystemValues.getInstance().system.serviceClassifications;
          }
          if ( props.itemType === 'Meal' ) {
            itemClassifications = SystemValues.getInstance().system.mealClassifications;
          }
          if ( props.itemType === 'Vehicle' ) {
            itemClassifications = SystemValues.getInstance().system.vehicleClassifications;
          }
          if ( props.itemType === 'RealEstate' ) {
            itemClassifications = SystemValues.getInstance().system.realEstateClassifications;
          }
        }}/>
      {
        getClassifications().length ?
          <GenericSelectInput id='classification' placeholder='Clasificacion'
            items={getClassifications()} disabled={isLoading} value={cClassification}
            setValue={setClassification} required={item ? false : true} /> : null
      }
      {
        props.itemType !== 'Vehicle' ?
          <GenericTextInput id='name' type='text' placeholder='Nombre'
            disabled={isLoading} value={cName}
            setValue={setName} required={stand ? false : true} /> : null
      }
      {
        props.itemType === 'Vehicle' ?
          <>
            <GenericTextInput id='year' type='tel' placeholder='Año'
              disabled={isLoading} value={cYear}
              setValue={setYear} required={stand ? false : true} />
            <GenericTextInput id='model' type='text' placeholder='Modelo'
              disabled={isLoading} value={cModel} setValue={setModel} required={stand ? false : true} />
          </> : null
      }
      <GenericTextInput id='shortDescription' type='text' placeholder='Descripcion corta'
        disabled={isLoading} value={cShortDescription} setValue={setShortDescription} required={stand ? false : true} />
      <GenericTextInput id='price' type='tel' placeholder='Precio'
        disabled={isLoading} value={cPrice}
        setValue={setPrice} required={stand ? false : true} />
      <GenericTextInput id='discount' type='tel' placeholder='Descuento'
        disabled={isLoading} value={cDiscount}
        setValue={setDiscount} required={stand ? false : true} />
      <GenericTextArea id='description' placeholder='Descripcion larga'
        disabled={isLoading} value={cDescription} setValue={setDescription} />
      <GenericImgInput id='imgPicture' placeholder={item ? 'Actualizar imagen de listado' : 'Imagen de listado'}
        disabled={isLoading} value={imgPicture} setValue={setImgPicture} required={item ? false : true} />
      <div className='input-field col s12 AddStandForm__sub-title'>
        <GenericCheckboxInput id='publishOnTheWall' placeholder='Publicar en el muro?'
          checked={cPublishOnTheWall} setValue={setPublishOnTheWall} />
      </div>
      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${isLoading && !item ? 'disabled' : ''}`}
          disabled={isLoading} />
      </div>
    </form>
  </>
  );
};

export default AddItemBasicInfo;
