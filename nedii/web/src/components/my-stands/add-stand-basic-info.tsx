/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, {
  useRef,
  useState
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericTextInput,
  GenericImgInput,
  GenericTextArea,
  GenericCheckboxInput,
  GenericSelectInput,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import NediiPlans from 'src/components/nedii-plans';
import SystemValues from 'src/constants/SystemValues';

const AddStandBasicInfo = ( props: any ): React.ReactElement => {
  const formRef: any = useRef(null);
  const stand = props.stand && props.stand.id ? props.stand : null;
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [logo, setLogo] = useState('');
  const [cover, setCover] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [expo, setExpo] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [restaurant, setRestaurant] = useState(false);
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState(0);
  const expos = SystemValues.getInstance().system.expos;
  const categories = SystemValues.getInstance().system.categories;
  let cName = '';
  let cExpo = '';
  let cGroup = '';
  let cState = '';
  let cCity = '';
  let cAddress = '';
  let cSlogan = '';
  let cShortDescription = '';
  let cDescription = '';
  let cRestaurant = '';
  let cAlwaysOpen = '';
  let cContactEmail = '';
  let cSupportEmail = '';
  let cPlan = 0;
  if ( stand && stand.attributes ) {
    if ( stand.attributes.name ) cName = stand.attributes.name;
    if ( stand.attributes.address ) cAddress = stand.attributes.address;
    if ( stand.attributes.slogan ) cSlogan = stand.attributes.slogan;
    if ( stand.attributes.short_description ) cShortDescription = stand.attributes.short_description;
    if ( stand.attributes.description ) cDescription = stand.attributes.description;
    if ( stand.attributes.restaurant ) cRestaurant = stand.attributes.restaurant;
    if ( stand.attributes.always_open ) cAlwaysOpen = stand.attributes.always_open;
    if ( stand.attributes.contact_email ) cContactEmail = stand.attributes.contact_email;
    if ( stand.attributes.support_email ) cSupportEmail = stand.attributes.support_email;
  }
  if ( stand && stand.relationships ) {
    if ( stand.relationships.expo &&
      stand.relationships.expo.data &&
      stand.relationships.expo.data.id ) {
      cExpo = stand.relationships.expo.data.id;
    }
    if ( stand.relationships.group &&
      stand.relationships.group.data &&
      stand.relationships.group.data.id ) {
      cGroup = stand.relationships.group.data.id;
    }
    if ( stand.relationships.city &&
      stand.relationships.city.data &&
      stand.relationships.city.data.attributes &&
      stand.relationships.city.data.attributes.name ) {
      cCity = stand.relationships.city.data.attributes.name;
      if ( stand.relationships.city.data.relationships.state &&
        stand.relationships.city.data.relationships.state.data &&
        stand.relationships.city.data.relationships.state.data.attributes &&
        stand.relationships.city.data.relationships.state.data.attributes.name ) {
        cState = stand.relationships.city.data.relationships.state.data.attributes.name;
      }
    }
    if ( stand.relationships.plan &&
      stand.relationships.plan.data &&
      stand.relationships.plan.data.id ) {
      cPlan = stand.relationships.plan.data.id;
    }
  }

  const getExpos = (): Array<any> => {
    const items: Array<any> = [];
    expos.forEach((i: any) => {
      items.push({
        value: Number(i.id),
        text: i.attributes.name
      });
    });
    return items;
  };
  const getCategories = (): Array<any> => {
    const items: Array<any> = [];
    categories.forEach((i: any) => {
      items.push({
        value: Number(i.id),
        text: i.attributes.name
      });
    });
    return items;
  };

  const addStand = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return;
    props.setIsLoading(true);
    if ( stand ) {
      const standToUpdate: any = {
        id: stand.id
      };
      if ( name ) standToUpdate.name = name;
      if ( slogan ) standToUpdate.slogan = slogan;
      if ( logo ) standToUpdate.img_logo = logo;
      if ( cover ) standToUpdate.img_cover = cover;
      if ( state ) standToUpdate.state = state;
      if ( city ) standToUpdate.city = city;
      if ( address ) standToUpdate.address = address;
      if ( shortDescription ) standToUpdate.short_description = shortDescription;
      if ( description ) standToUpdate.description = description;
      if ( restaurant ) standToUpdate.restaurant = restaurant;
      if ( contactEmail ) standToUpdate.contact_email = contactEmail;
      if ( plan ) standToUpdate.plan = plan;
      if ( expo ) standToUpdate.expo = expo;
      if ( category ) standToUpdate.group = category;
      if ( supportEmail ) standToUpdate.support_email = supportEmail;
      if ( phone ) standToUpdate.phone = phone;
      if ( alwaysOpen ) standToUpdate.always_open = alwaysOpen;
      APISDK.UpdateStand(standToUpdate)
        .then(() => {
          return APISDK.GetSellerStands();
        })
        .then(() => {
          return APISDK.GetSellerStandsById(stand.id);
        })
        .then((response: any) => {
          props.setStand(response);
          props.setIsLoading(false);
        })
        .catch((error: any) => {
          console.log('error', error);
          props.setIsLoading(false);
        });
    } else {
      const standToCreate: any = {
        name: name ? name : cName,
        slogan: slogan ? slogan : cSlogan,
        img_logo: logo ? logo : null,
        img_cover: cover,
        state: state,
        city: city,
        address: address,
        short_description: shortDescription,
        description: description,
        restaurant: Boolean(restaurant),
        contact_email: contactEmail,
        plan: plan ? Number(plan) : Number(cPlan),
        expo: Number(expo),
        group: Number(category),
        support_email: supportEmail,
        phone: phone,
        always_open: Boolean(alwaysOpen)
      };
      APISDK.AddStand(standToCreate)
        .then((response: any) => {
          props.setIsLoading(false);
          props.setStand(response);
          props.setValueReference('step-1');
        })
        .catch((error: any) => {
          console.log('error', error);
          props.setIsLoading(false);
        });
    }
  };

  return (
  <>
    {
      !stand ?
        <StrongText
          text='Paso 1 - Informacion basica'
          fullWidth={true}
          align={TextAlignEnum.left} /> :
        <>
        <HorizontalSpace size={SizesEnum.small} />
        <StrongText
          fullWidth={true}
          align={TextAlignEnum.left}
          text={`Editando ${stand.attributes.name}`} />
        </>
    }
    <form className='AddStandForm__form' onSubmit={addStand} ref={formRef}>
      <div className='input-field col s12 AddStandForm__sub-title'>
        <b>Informacion basica de la empresa</b>
      </div>
      <GenericTextInput id='name' type='text' placeholder='Nombre de la empresa'
        disabled={props.isLoading} value={cName}
        setValue={setName} required={stand ? false : true} />
      <GenericSelectInput id='expo' placeholder='Expo' items={getExpos()}
        disabled={props.isLoading} value={cExpo}
        setValue={setExpo} required={stand ? false : true} />
      <GenericSelectInput id='category' placeholder='Categoria' items={getCategories()}
        disabled={props.isLoading} value={cGroup}
        setValue={setCategory} required={stand ? false : true} />

      <div className='input-field col s12 AddStandForm__sub-title'>
        <HorizontalSpace size={SizesEnum.x_small} />
        <b>Direccion de la empresa</b>
      </div>
      <GenericTextInput id='state' type='text' placeholder='Estado del pais'
        disabled={props.isLoading} value={cState} setValue={setState} required={stand ? false : true} />
      <GenericTextInput id='city' type='text' placeholder='Ciudad'
        disabled={props.isLoading} value={cCity} setValue={setCity} required={stand ? false : true} />
      <GenericTextInput id='address' type='text' placeholder='Calle, numero y colonia'
        disabled={props.isLoading} value={cAddress} setValue={setAddress} required={stand ? false : true} />

      <div className='input-field col s12 AddStandForm__sub-title'>
        <HorizontalSpace size={SizesEnum.x_small} />
        <b>Identidad de la empresa</b>
      </div>
      <GenericTextInput id='slogan' type='text' placeholder='Slogan de la empresa'
        disabled={props.isLoading} value={cSlogan} setValue={setSlogan} required={stand ? false : true} />
      <GenericTextInput id='shortDescription' type='text' placeholder='Descripcion corta de la empresa'
        disabled={props.isLoading} value={cShortDescription} setValue={setShortDescription} required={stand ? false : true} />
      <GenericTextArea id='description' placeholder='Descripcion larga de la empresa'
        disabled={props.isLoading} value={cDescription} setValue={setDescription} />
      <GenericImgInput id='logo' placeholder={stand ? 'Actualizar logo de la empresa' : 'Logo de la empresa'}
        disabled={props.isLoading} value={logo} setValue={setLogo} required={stand ? false : true} />
      <GenericImgInput id='cover' placeholder={stand ? 'Actualizar imagen de encabezado' : 'Imagen de encabezado de la empresa'}
        disabled={props.isLoading} value={cover} setValue={setCover} required={stand ? false : true} />
      <div className='input-field col s12 AddStandForm__sub-title'>
        <GenericCheckboxInput id='promotions' placeholder='La empresa es un restaurante?'
          checked={cRestaurant} setValue={setRestaurant} />
      </div>
      <div className='input-field col s12 AddStandForm__sub-title'>
        <GenericCheckboxInput id='alwaysOpen' placeholder='La empresa esta abierta 24 horas?'
          checked={cAlwaysOpen} setValue={setAlwaysOpen} />
      </div>

      <div className='input-field col s12 AddStandForm__sub-title'>
        <HorizontalSpace size={SizesEnum.x_small} />
        <b>Datos de contacto</b>
      </div>
      <GenericTextInput id='contactEmail' type='email' placeholder='Email de contacto'
        disabled={props.isLoading} value={cContactEmail} setValue={setContactEmail} required={stand ? false : true} />
      <GenericTextInput id='supportEmail' type='email' placeholder='Email de soporte'
        disabled={props.isLoading} value={cSupportEmail} setValue={setSupportEmail} />
      <GenericTextInput id='phone1' type='tel' placeholder='Telefono de contacto'
        disabled={props.isLoading} value={phone} setValue={setPhone} />

      <div className='input-field col s12'>
        <HorizontalSpace size={SizesEnum.xx_small} />
      </div>

      <StrongText
        text='Paso 2 - Planes Nedii'
        fullWidth={true}
        align={TextAlignEnum.left} />
      <p>Para continuar seleccione un Plan de Nedii.</p>
      <NediiPlans setValue={setPlan} plan={plan ? plan : cPlan} />

      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${ (props.isLoading || !plan) && !stand ? 'disabled' : ''}`}
          disabled={props.isLoading} />
      </div>
    </form>
  </>
  );
};

export default AddStandBasicInfo;
