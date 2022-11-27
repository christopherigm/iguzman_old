import React from 'react';
import {
  HorizontalSpace,
  SizesEnum
} from 'rrmc';
import StandDetailGallery from 'src/components/stand-detail-gallery/stand-detail-gallery';

const GenericItemGallery = (props: any): React.ReactElement => {
  const item = props.item;
  if ( !item || !item.attributes || !item.relationships ) return <></>;

  return (
    <>
      <HorizontalSpace size={SizesEnum.small} />
      {
        item.type === 'Meal' && item.relationships.meal_pictures &&
        item.relationships.meal_pictures.data ?
          <StandDetailGallery images={item.relationships.meal_pictures.data} /> : null
      }
      {
        item.type === 'Product' && item.relationships.product_pictures &&
        item.relationships.product_pictures.data ?
          <StandDetailGallery images={item.relationships.product_pictures.data} /> : null
      }
      {
        item.type === 'Service' && item.relationships.service_pictures &&
        item.relationships.service_pictures.data ?
          <StandDetailGallery images={item.relationships.service_pictures.data} /> : null
      }
      {
        item.type === 'Vehicle' && item.relationships.vehicle_pictures &&
        item.relationships.vehicle_pictures.data ?
          <StandDetailGallery images={item.relationships.vehicle_pictures.data} /> : null
      }
      {
        item.type === 'RealEstate' && item.relationships.real_estate_pictures &&
        item.relationships.real_estate_pictures.data ?
          <StandDetailGallery images={item.relationships.real_estate_pictures.data} /> : null
      }
    </>
  );
};

export default GenericItemGallery;
