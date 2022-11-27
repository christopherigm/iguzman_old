import React from 'react';
import { TextWithIcon } from 'rrmc';

const ContactBusiness = (props: any): React.ReactElement => {
  return (
    <div className='row BusinessCard'>
      <div className='BusinessCard__contact col s12 m3'>
        {
          props.stand.relationships.owner.data.attributes.profile.owner_phone ?
            <TextWithIcon
              text={props.stand.relationships.owner.data.attributes.profile.owner_phone}
              link={`tel:+52${props.stand.relationships.owner.data.attributes.profile.owner_phone}`}
              icon='call'
              color_icon='green-text' /> : null
        }
      </div>
      <div className='BusinessCard__contact col s12 m3'>
        {
          props.stand.relationships.owner.data.attributes.profile.owner_whatsapp ?
            <TextWithIcon
              text={props.stand.relationships.owner.data.attributes.profile.owner_whatsapp}
              link={`https://wa.me/+52${props.stand.relationships.owner.data.attributes.profile.owner_whatsapp}`}
              icon='whatsapp'
              color_icon='green-text' /> : null
        }
      </div>
      <div className='BusinessCard__contact col s12 m3'>
        {
          props.stand.relationships.owner.data.attributes.profile.owner_email ?
            <TextWithIcon
              text={props.stand.relationships.owner.data.attributes.profile.owner_email}
              link={`mailto:${props.stand.relationships.owner.data.attributes.profile.owner_email}`}
              icon='mail_outline'
              color_icon='red-text'
              truncate={true} /> : null
        }
      </div>
      <div className='BusinessCard__contact col s12 m3'>
        {
          props.stand.attributes.linkedin_link ?
            <TextWithIcon
              text='Linkedin'
              link={props.stand.attributes.linkedin_link}
              icon='class'
              color_icon='blue-text'
              truncate={true} /> : null
        }
      </div>
    </div>
  );
};

export default ContactBusiness;
