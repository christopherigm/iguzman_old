import React, {
  useState,
  useEffect
} from 'react';
import {
  GenericTextInput,
  GenericCheckboxInput,
  GenericTextArea,
  HorizontalSpace,
  StrongText,
  TextAlignEnum,
  SizesEnum
} from 'rrmc';
import './user-account-configurations.scss';
import APISDK from 'src/api/api-sdk/api-sdk';
import NediiPlans from 'src/components/nedii-plans';
import SystemValues from 'src/constants/SystemValues';

const UserAccountConfigurations = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const user = SystemValues.getInstance().system.user;
  const profile = SystemValues.getInstance().system.user.attributes.profile;
  if ( !user || !user.attributes || !profile || !profile ) return <></>;
  const imgProfile = profile.img_picture ? profile.img_picture : '';
  const [email, setEmail] = useState(user.attributes.email);
  const [firstName, setFirstName] = useState(user.attributes.first_name);
  const [lastName, setLastName] = useState(user.attributes.last_name);
  const [userImage, setUserImage] = useState(imgProfile);
  const [ownerPosition, setOwnerPosition] = useState(profile.owner_position);
  const [ownerPhone, setOwnerPhone] = useState(profile.owner_phone);
  const [ownerEmail, setOwnerEmail] = useState(profile.owner_email);
  const [ownerOfficePhone, setOwnerOfficePhone] = useState(profile.owner_office_phone);
  const [ownerWhatsApp, setOwnerWhatsApp] = useState(profile.owner_whatsapp);
  const [ownerAddress, setOwnerAddress] = useState(profile.owner_address);
  const [newsletter, setNewsletter] = useState(profile.newsletter);
  const [promotions, setPromotions] = useState(profile.promotions);
  const [biography, setBiography] = useState(profile.biography);
  const [ownerPositionDescription, setOwnerPositionDescription] = useState(profile.owner_position_description);

  const updateUserData = (data: any) => {
    setIsLoading(true);
    APISDK.UpdateUser(data.user)
      .then((response: any) => {
        console.log(response);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
    APISDK.UpdateUserProfile(data.userProfile)
      .then((response: any) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const prepareUserData = (e: any) => {
    e.preventDefault();
    const data: any = {
      user: {
        email: email
      },
      userProfile: {}
    };
    if ( firstName ) data.user.first_name = firstName;
    if ( lastName ) data.user.last_name = lastName;
    if ( userImage.search(/base64/g) >= 0 ) data.userProfile.img_picture = userImage;
    if ( ownerPosition ) data.userProfile.owner_position = ownerPosition;
    if ( ownerPhone ) data.userProfile.owner_phone = ownerPhone;
    if ( ownerEmail ) data.userProfile.owner_email = ownerEmail;
    if ( ownerOfficePhone ) data.userProfile.owner_office_phone = ownerOfficePhone;
    if ( ownerWhatsApp ) data.userProfile.owner_whatsapp = ownerWhatsApp;
    if ( ownerAddress ) data.userProfile.owner_address = ownerAddress;
    data.userProfile.newsletter = newsletter;
    data.userProfile.promotions = promotions;
    if ( biography ) data.userProfile.biography = biography;
    if ( ownerPositionDescription ) data.userProfile.owner_position_description = ownerPositionDescription;
    updateUserData(data);
  };

  const upgradeToSeller = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    APISDK.UpgradeUserToSeller()
      .then((response: any) => {
        setIsLoading(false);
        console.log(response);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  }, [window]);

  return (
    <div className='col s12 m8 UserAccountConfigurations'>
      <StrongText text='Configuracion de la cuenta' fullWidth={true} align={TextAlignEnum.left} />
      <HorizontalSpace size={SizesEnum.small} />
      <form onSubmit={prepareUserData} className='row UserAccountConfigurations__form'>
        <div className='input-field col s12 m6 UserAccountConfigurations__input'>
          <div className='UserAccountConfigurations__user-image-wrapper'>
            <div className='UserAccountConfigurations__user-image z-depth-1'
              style={{ backgroundImage: `url(${userImage})` }}></div>
            <div className='UserAccountConfigurations__user-image-input-wrapper white z-depth-1'>
              <i className='material-icons UserAccountConfigurations__user-image-input-icon grey-text text-darken-3'>add_a_photo</i>
              <input type='file' id='user-image' onChange={(e: any) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (e: any) => {
                    setUserImage(e.target.result);
                  };
                  reader.readAsDataURL(file);
                }} accept='image/*' className='UserAccountConfigurations__user-image-input' />
            </div>
            <label htmlFor='user-image' className='hide'>-</label>
          </div>
        </div>
        <GenericTextInput id='firstName' type='text' placeholder='Nombre(s)'
          disabled={isLoading} value={firstName} setValue={setFirstName} />
        <GenericTextInput id='lastName' type='text' placeholder='Apellidos'
          disabled={isLoading} value={lastName} setValue={setLastName} />
        <GenericTextInput id='email' type='email' placeholder='Correo electronico'
          disabled={true} value={email} setValue={setEmail} />
        <GenericCheckboxInput id='newsletter' placeholder='News letter'
          checked={newsletter} setValue={setNewsletter} />
        <GenericCheckboxInput id='promotions' placeholder='Promociones'
          checked={promotions} setValue={setPromotions} />
        {
          profile.is_seller ?
            <>
              <div className='col s12'>
                <HorizontalSpace size={SizesEnum.small} />
                <StrongText text='Informacion de expositor' fullWidth={true} align={TextAlignEnum.left} />
              </div>
              <GenericTextInput id='ownerPosition' type='text' placeholder='Posicion del expositor'
                disabled={isLoading} value={ownerPosition} setValue={setOwnerPosition} />
              <GenericTextInput id='ownerPhone' type='tel' placeholder='Telefono del expositor'
                disabled={isLoading} value={ownerPhone} setValue={setOwnerPhone} />
              <GenericTextInput id='ownerEmail' type='email' placeholder='Email del expositor'
                disabled={isLoading} value={ownerEmail} setValue={setOwnerEmail} />
              <GenericTextInput id='ownerOfficePhone' type='tel' placeholder='Tel. de oficina del expositor'
                disabled={isLoading} value={ownerOfficePhone} setValue={setOwnerOfficePhone} />
              <GenericTextInput id='ownerWhatsApp' type='tel' placeholder='WhatsApp del expositor'
                disabled={isLoading} value={ownerWhatsApp} setValue={setOwnerWhatsApp} />
              <GenericTextInput id='ownerAddress' type='text' placeholder='Direccion del expositor'
                disabled={isLoading} value={ownerAddress} setValue={setOwnerAddress} />
              <GenericTextArea id='biography' placeholder='Biografia del expositor'
                disabled={isLoading} value={biography} setValue={setBiography} />
              <GenericTextArea id='ownerPositionDescription' placeholder='Descripcion del puesto del expositor'
                disabled={isLoading} value={ownerPositionDescription} setValue={setOwnerPositionDescription} />
            </> : null
        }
        <div className='input-field col s12 UserAccountConfigurations__input'>
          <HorizontalSpace size={SizesEnum.small} />
          <input id='submit' type='submit'
            value='Guardar'
            className='waves-effect waves-light btn right cyan'
            disabled={isLoading} />
        </div>
        <div className={`progress col s12 ${isLoading ? '' : 'hide' }`}>
          <div className='indeterminate'></div>
        </div>
        {
          !profile.is_seller ?
            <div className='col s12'>
              <HorizontalSpace size={SizesEnum.small} />
              <StrongText
                text='Convertirse en expositor de Nedii'
                fullWidth={true}
                align={TextAlignEnum.left} />
              <p>Ser expositor en Nedii es rapido y <b>gratis</b>, comienza ahora.</p>
              <a className='waves-effect waves-light btn' onClick={upgradeToSeller}>
                <i className='material-icons left'>business_center</i>Ser expositor
              </a>
            </div> :
            <div className='col s12'>
              <HorizontalSpace size={SizesEnum.small} />
              <StrongText
                text='Planes Nedii'
                fullWidth={true}
                align={TextAlignEnum.left} />
              <p>Para continuar seleccione un Plan de Nedii.</p>
              <NediiPlans />
            </div>
        }
      </form>
    </div>
  );
};

export default UserAccountConfigurations;
