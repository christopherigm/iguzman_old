import React, {
  useState,
  useRef
} from 'react';
import {
  HorizontalSpace,
  StrongText,
  GenericTextInput,
  MenuChoiceMenu,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import './user-address.scss';

const menuItems = [
  {
    name: 'Casa',
    value: 'house',
    icon: 'house'
  },
  {
    name: 'Departamento',
    value: 'apartment',
    icon: 'location_city'
  },
  {
    name: 'Trabajo',
    value: 'work',
    icon: 'work'
  },
  {
    name: 'Buzon',
    value: 'mail_box',
    icon: 'markunread_mailbox'
  }
];

const AddUserAddress = (props: any): React.ReactElement => {
  const [alias, setAlias] = useState('');
  const [receptorName, setReceptorName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [extNumber, setExtNumber] = useState('');
  const [intNumber, setIntNumber] = useState('');
  const [reference, setReference] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [addressType, setAddressType] = useState('house');
  const formRef: any = useRef(null);

  const updateUserAddress = (e: any) => {
    e.preventDefault();
    if ( props.isLoading ) return;
    const address: any = {
      alias: alias,
      state: state,
      city: city,
      zip_code: zipCode,
      street: street,
      ext_number: extNumber,
      address_type: addressType
    };
    if ( intNumber ) address.int_number = intNumber;
    if ( reference ) address.reference = reference;
    if ( deliveryInstructions ) address.delivery_instructions = deliveryInstructions;
    if ( phone ) address.phone = phone;
    if ( receptorName ) address.receptor_name = receptorName;
    props.setIsLoading(true);
    APISDK.AddUserAddress(address)
      .then(() => {
        props.setIsLoading(false);
        formRef.current.reset();
        setAlias('');
        setReceptorName('');
        setPhone('');
        setState('');
        setCity('');
        setZipCode('');
        setStreet('');
        setExtNumber('');
        setIntNumber('');
        setReference('');
        setDeliveryInstructions('');
        setAddressType('');
      })
      .catch((error: any) => {
        props.setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
    <StrongText
      align={TextAlignEnum.left}
      fullWidth={true}
      text='Agregar nueva direccion' />
    <form onSubmit={updateUserAddress} ref={formRef}>
      <GenericTextInput id='alias' type='text' placeholder='Alias de direccion'
        disabled={props.isLoading} value={alias} setValue={setAlias} required={true} />
      <GenericTextInput id='state' type='text' placeholder='Estado'
        disabled={props.isLoading} value={state} setValue={setState} required={true} />
      <GenericTextInput id='city' type='text' placeholder='Ciudad'
        disabled={props.isLoading} value={city} setValue={setCity} required={true} />
      <GenericTextInput id='street' type='text' placeholder='Nombre de la calle'
        disabled={props.isLoading} value={street} setValue={setStreet} required={true} />
      <GenericTextInput id='extNumber' type='text' placeholder='Numero exterior'
        disabled={props.isLoading} value={extNumber} setValue={setExtNumber} required={true} />
      <GenericTextInput id='intNumber' type='text' placeholder='Numero interior'
        disabled={props.isLoading} value={intNumber} setValue={setIntNumber} />
      <GenericTextInput id='zipCode' type='tel' placeholder='Codigo postal'
        disabled={props.isLoading} value={zipCode} setValue={setZipCode} required={true} />
      <GenericTextInput id='receptorName' type='text' placeholder='Nombre del receptor'
        disabled={props.isLoading} value={receptorName} setValue={setReceptorName} />
      <GenericTextInput id='phone' type='tel' placeholder='Telefono de contacto'
        disabled={props.isLoading} value={phone} setValue={setPhone} />
      <GenericTextInput id='reference' type='text' placeholder='Referencia'
        disabled={props.isLoading} value={reference} setValue={setReference} />
      <GenericTextInput id='deliveryInstructions' type='text' placeholder='Instrucciones de entrega'
        disabled={props.isLoading} value={deliveryInstructions} setValue={setDeliveryInstructions} />
      <div className='col s12'>
        <MenuChoiceMenu
          title='Tipo de direccion'
          color='cyan'
          items={menuItems}
          valueReference={addressType}
          setValueReference={setAddressType} />
        <HorizontalSpace size={SizesEnum.xx_small} />
      </div>
      <div className='input-field col s12'>
        <input id='submit' type='submit'
          value='Guardar'
          className={`waves-effect waves-light btn right cyan ${ props.isLoading ? 'disabled' : ''}`}
          disabled={props.isLoading} />
      </div>
      <div className={`progress col s12 ${ props.isLoading ? '' : 'hide' }`}>
        <div className='indeterminate'></div>
        <HorizontalSpace size={SizesEnum.x_small} />
      </div>
    </form>
    </>
  );
};

export default AddUserAddress;
