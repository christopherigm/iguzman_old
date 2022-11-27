import React from 'react';
import {
  TextWithIconInfo,
  StrongText,
  TextWithIcon
} from 'rrmc';
import { ItemStateHumanReadable } from 'src/components/_adapters/buyable-item-adapter/products-services';

const VehicleAttributes = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.item.attributes.state ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text={`Estado: ${ItemStateHumanReadable(props.item.attributes.state)}`} /> : null
      }
      {
        props.item.attributes.year ?
         <TextWithIconInfo colorIcon='cyan-text' icon='check' text={`Año: ${props.item.attributes.year}`} /> : null
      }
      {
        props.item.attributes.doors ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text={`Puertas: ${props.item.attributes.doors}`} /> : null
      }
      {
        props.item.attributes.gas ?
         <TextWithIconInfo colorIcon='cyan-text' icon='ev_station' text='Combustible: Gasolina' /> : null
      }
      {
        props.item.attributes.diesel ?
          <TextWithIconInfo colorIcon='cyan-text' icon='ev_station' text='Combustible: Diesel' /> : null
      }
      {
        props.item.attributes.electric ?
        <TextWithIconInfo colorIcon='cyan-text' icon='flash_auto' text='Sistema: Electrico' /> : null
      }
      {
        props.item.attributes.automatic ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text='Transmisión: Automatica' /> :
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text='Transmisión: Manual' />
      }
      {
        props.item.attributes.four_wd ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text='Tracción: 4x4' /> : null
      }
      {
        props.item.attributes.all_wd ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text='Tracción: Todo Terreno' /> : null
      }
      {
        props.item.attributes.warranty_days && props.item.attributes.warranty_days > 0 ?
          <TextWithIconInfo colorIcon='cyan-text' icon='loyalty' text={`Días de Garantía: ${props.item.attributes.warranty_days}`} /> : null
      }
      {
        props.item.relationships.model.data.attributes.name ?
          <TextWithIconInfo colorIcon='cyan-text' icon='check' text={`Modelo: ${props.item.relationships.model.data.attributes.name}`} /> : null
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

export default VehicleAttributes;
