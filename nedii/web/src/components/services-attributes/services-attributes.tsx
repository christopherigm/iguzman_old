import React from 'react';
import {
  TextWithIcon,
  TextWithIconInfo,
  StrongText
} from 'rrmc';

const ServicesAttributes = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.item.attributes.warranty_days && props.item.attributes.warranty_days > 0 ?
          <TextWithIconInfo
            colorIcon='cyan-text'
            icon='check'
            text={`Días de garantía: ${props.item.attributes.warranty_days}`} /> : null
      }
      {
        props.item.attributes.support_email || props.item.attributes.support_phone ?
          <StrongText text='Consultas o aclaraciones' /> : null
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
      {
        props.item.attributes.video_link ?
          <TextWithIcon
            link={props.item.attributes.video_link}
            truncate={true}
            color_icon='red-text'
            icon='live_tv'
            text='Canal YouTube' /> : null
      }
    </>
  );
};

export default ServicesAttributes;
