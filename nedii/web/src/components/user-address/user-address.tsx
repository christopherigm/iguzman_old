import React, {
  useState,
  useEffect
} from 'react';
import {
  StrongText,
  BasicIcon,
  HorizontalSpace,
  VerticalSpace,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';
import './user-address.scss';
import AddUserAddress from 'src/components/user-address/add-user-address';
import EditUserAddress from 'src/components/user-address/edit-user-address';

const getAddressIcon = (type: string): string => {
  switch ( type ) {
    case 'apartment':
      return 'location_city';
    case 'mail_box':
      return 'markunread_mailbox';
    default:
      return type;
  }
};

const UserAddressItem = (props: any): React.ReactElement => {
  const item = props.item;
  const [editing, setEditing] = useState(false);
  let fullAddress = `${item.attributes.street} ${item.attributes.ext_number}`;
  if ( item.attributes.int_number ) {
    fullAddress += ` ${item.attributes.int_number}, `;
  } else {
    fullAddress += ', ';
  }
  if ( item.relationships &&
    item.relationships.city &&
    item.relationships.city.data &&
    item.relationships.city.data.attributes &&
    item.relationships.city.data.attributes.name ) {
    fullAddress += `${item.relationships.city.data.attributes.name}, `;
  }
  if ( item.relationships &&
    item.relationships.city &&
    item.relationships.city.data &&
    item.relationships.city.data.relationships &&
    item.relationships.city.data.relationships.state &&
    item.relationships.city.data.relationships.state.data &&
    item.relationships.city.data.relationships.state.data.attributes &&
    item.relationships.city.data.relationships.state.data.attributes.name ) {
    fullAddress += `${item.relationships.city.data.relationships.state.data.attributes.name}, `;
  }
  fullAddress += `${item.attributes.zip_code}.`;

  const deleteAddress = () => {
    if ( props.isLoading ) return;
    props.setIsLoading(true);
    APISDK.DeleteUserAddress(item.id)
      .then(() => {
        props.setIsLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        props.setIsLoading(false);
      });
  };

  return (
    <div className={`col ${editing ? 's12' : 's12 m6'}`}>
      <div className='UserAddress__item GenericCard'>
        {
          editing ?
          <EditUserAddress
            item={props.item}
            isLoading={props.isLoading}
            setIsLoading={props.setIsLoading}
            editing={editing}
            setEditing={setEditing} /> :
          <>
          <div className='UserAddress__header'>
            <BasicIcon
              icon={getAddressIcon(item.attributes.address_type)}
              color='cyan-text'
              disabled={props.isLoading}
              noPadding={true} />
            <StrongText
              color='#00acc1'
              fullWidth={true}
              text={item.attributes.alias} />
            <div className='UserAddress__flex-filler'></div>
            <BasicIcon
              icon='edit'
              color='blue-text text-lighten-1'
              disabled={props.isLoading}
              action={() => {
                setEditing(!editing);
              }}
              noPadding={true} />
            <VerticalSpace size={SizesEnum.x_small} />
            <BasicIcon
              icon='delete'
              color='red-text text-lighten-1'
              action={deleteAddress}
              disabled={props.isLoading}
              noPadding={true} />
          </div>
          <HorizontalSpace size={SizesEnum.xxx_small} />
          <div className='UserAddress__address'>
            {fullAddress}
          </div>
          </>
        }
      </div>
    </div>
  );
};

const UserAddress = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const addresses = SystemValues.getInstance().system.addresses;

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    APISDK.GetUserAddress();
  }, [window]);

  return (
    <div className='col s12 m8 UserAddress row'>
      <div className='col s12'>
        <StrongText
          fullWidth={true}
          align={TextAlignEnum.left}
          text={`${addresses.length} Direccion${addresses.length === 1 ? '' : 'es'} registrada${addresses.length === 1 ? '' : 's'}`} />
        <HorizontalSpace size={SizesEnum.x_small} />
      </div>
      {
        addresses.map((i: any, index: number) => {
          return <UserAddressItem
            key={index} item={i}
            isLoading={isLoading}
            setIsLoading={setIsLoading} />;
        })
      }
      <div className='col s12'>
        <HorizontalSpace size={SizesEnum.xx_small} />
        <AddUserAddress
          isLoading={isLoading}
          setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default UserAddress;
