import React from 'react';
import './card-holder.scss';
import {
  BasicTextWithIcon,
  StrongText,
  BasicIcon,
  TextAlignEnum
} from 'rrmc';
import { Link } from 'react-router-dom';
import SystemValues from 'src/constants/SystemValues';
import FavoriteButtonAdapterInterface from 'src/components/_adapters/favorite-button-adapter';

const imageCardHolder = '/assets/card-holder.jpg';

const CardHolder = (props: any): React.ReactElement => {
  const system = SystemValues.getInstance().system;
  const prefix = system.platform.prefix;
  const cardHolder = `${prefix}${imageCardHolder}`;
  const stand = props.stand;
  if ( !stand ) return <></>;
  const standURL = `/empresa/${props.standSlug ? props.standSlug : props.stand.attributes.slug}`;
  const zip_code = props.stand.attributes.zip_code ? props.stand.attributes.zip_code : null;
  const address = props.stand.attributes.address ? props.stand.attributes.address : null;
  let fullAddress: string = address;
  if (zip_code) {
    fullAddress += `,${zip_code}`;
  }

  return (
    <div className='CardHolder col s12 m6'>
      <div className='GenericCard'>
        <div className='CardHolder__wrapper' style={{backgroundImage: `url(${cardHolder})`}}>
          <div className='CardHolder__icons'>
            <FavoriteButtonAdapterInterface item={stand} />
            <BasicIcon
              icon='home'
              color='white-text'
              link={standURL}
              Link={Link} />
            <BasicIcon
              icon='place'
              color='white-text'
              link={`https://www.google.com/maps?q=${fullAddress}`}
              Link={Link} />
          </div>
          <div className='blue CardHolder__flex-filler'></div>
          <div className='CardHolder__container-logo'>
            <Link
              to={standURL}
              className='CardHolder__img-logo'
              style={{backgroundImage: `url(${props.stand.attributes.img_logo})`}}></Link>
          </div>
        </div>
        <div className='CardHolder__info'>
          <StrongText
            text={props.stand.attributes.name}
            align={TextAlignEnum.right}
            fullWidth={true}
            shadow={true} />
          {
            props.stand.attributes.contact_email ?
              <BasicTextWithIcon
                icon='email'
                color_icon='red-text'
                text={props.stand.attributes.contact_email}
                link={`mailto:${props.stand.attributes.contact_email}`} /> : null
          }
          {
            props.stand.relationships.owner.data.attributes.profile.owner_phone ?
              <BasicTextWithIcon
                icon='local_phone'
                color_icon='green-text'
                text={props.stand.relationships.owner.data.attributes.profile.owner_phone}
                link={`tel:521+${props.stand.relationships.owner.data.attributes.profile.owner_phone}`} /> : null
          }
          {
            props.stand.attributes.web_link ?
              <BasicTextWithIcon
                icon='language'
                color_icon='yellow-text'
                text={props.stand.attributes.web_link}
                link={props.stand.attributes.web_link} /> : null
          }
        </div>
      </div>
    </div>
  );
};

export default CardHolder;
