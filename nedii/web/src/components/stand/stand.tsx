import React from 'react';
import {
  HorizontalSpace,
  CommonLargeText,
  QRCodeComponent,
  SizesEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import StandDetailGallery from 'src/components/stand-detail-gallery';
import StandContactInfo from 'src/components/stand-contact-info';
import StandOwnerInfo from 'src/components/stand-owner-info';
import ExpoItem from 'src/components/expo-grid/expo-item';
import GroupItem from 'src/components/group-item';
import StandOptionMenuGrid from 'src/components/stand-options-menu-grid';

const StandComponent = (props: any): React.ReactElement => {
  const stand = props.stand;

  return (
    <div className='Stand container row'>
      <HorizontalSpace size={SizesEnum.small} />
      <div className='col s12 m8'>
        <StandOptionMenuGrid standSlug={stand.attributes.slug} />
        <CommonLargeText text={stand.attributes.description} Link={Link} />
        <HorizontalSpace size={SizesEnum.x_small} />
        <StandDetailGallery images={stand.relationships.pictures.data} />
        <HorizontalSpace size={SizesEnum.small} />
        <div className='hide-on-small-only'>
          <QRCodeComponent title={`QR code de ${stand.attributes.name}`} />
          <HorizontalSpace size={SizesEnum.small} />
        </div>
      </div>
      <div className='col s12 m4'>
        {
          stand.relationships.phones.data.length || stand.attributes.address ?
            <>
              <StandContactInfo
                title='Contacto'
                address={stand.attributes.address}
                city={stand.relationships.city.data}
                zip_code={stand.attributes.zip_code}
                phones={stand.relationships.phones.data} />
              <HorizontalSpace size={SizesEnum.small} />
            </> : null
        }
        {
          stand.relationships.owner.data.attributes &&
          stand.relationships.owner.data.attributes.profile ?
            <>
              <StandOwnerInfo owner={stand.relationships.owner.data.attributes} />
              <HorizontalSpace size={SizesEnum.small} />
            </> : null
        }
        <ExpoItem item={stand.relationships.expo.data} />
        <GroupItem
          item={stand.relationships.group.data}
          expoId={stand.relationships.expo.data.attributes.slug} />
        <div className='hide-on-med-and-up'>
          <HorizontalSpace size={SizesEnum.x_small} />
          <QRCodeComponent title={`QR code de ${stand.attributes.name}`} />
          <HorizontalSpace size={SizesEnum.x_small} />
        </div>
      </div>
    </div>
  );
};

export default StandComponent;
