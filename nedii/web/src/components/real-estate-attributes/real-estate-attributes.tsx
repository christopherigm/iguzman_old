import React from 'react';
import {
  TextWithIconInfo,
  StrongText,
  TextWithIcon
} from 'rrmc';
import { ItemStateHumanReadable } from 'src/components/_adapters/buyable-item-adapter/products-services';

const RealEstateAttributes = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.item.attributes.state ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Estado: ${ItemStateHumanReadable(props.item.attributes.state)}`} /> : null
      }
      {
        props.item.attributes.year ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Año de construcción: ${props.item.attributes.year}`} /> : null
      }
      {
        props.item.attributes.area ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Área de construcción: ${props.item.attributes.area} m2`} /> : null
      }
      {
        props.item.attributes.num_of_bedrooms ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de recamaras: ${props.item.attributes.num_of_bedrooms}`} /> : null
      }
      {
        props.item.attributes.num_of_bathrooms ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de baños: ${props.item.attributes.num_of_bathrooms}`} /> : null
      }
      {
        props.item.attributes.num_of_parking_spots ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Numero de cajones estacionamientos: ${props.item.attributes.num_of_parking_spots}`} /> : null
      }
      {
        props.item.attributes.support_email || props.item.attributes.support_phone ?
        <StrongText text='Consultas' /> : null
      }
      {
        props.item.attributes.support_email ?
          <TextWithIcon
            link={`mailto:${props.item.attributes.support_email}`}
            truncate={true}
            color_icon='red-text'
            icon='mail_outline'
            text={`Email de Soporte: ${props.item.attributes.support_email}`} /> : null
      }
      {
        props.item.attributes.support_phone ?
          <TextWithIcon
            link={`tel:${props.item.attributes.support_phone}`}
            truncate={true}
            color_icon='green-text'
            icon='call'
            text={`Telefono de soporte: ${props.item.attributes.support_phone}`} /> : null
      }
    </>
  );
};

export default RealEstateAttributes;
