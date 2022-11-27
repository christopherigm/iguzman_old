import React from 'react';
import { TextWithIcon } from 'rrmc';
import './stand-owner-info.scss';

const StandOwnerInfo = (props: any): React.ReactElement => {
  const owner: any = props.owner;
  const profile: any = owner.profile || {};

  if ( !profile.img_picture ) return <></>;

  return (
    <div className='StandOwnerInfo GenericCard'>
      {
        profile.img_picture ?
        <div
          className='StandOwnerInfo__owner-img'
          style={{backgroundImage: `url(${profile.img_picture})`}}>
        </div> : null
      }
      {
        owner.first_name && owner.last_name ?
          <div className='StandOwnerInfo__owner-name'>{owner.first_name} {owner.last_name}</div> : null
      }
      {
        profile.owner_position ?
          <div className='StandOwnerInfo__owner-position'>{profile.owner_position}</div> : null
      }
      {
        profile.owner_position_description ?
          <div dangerouslySetInnerHTML={{__html: profile.owner_position_description}}></div> : null
      }
      {
        profile.owner_office_phone || profile.owner_whatsapp ||
        profile.owner_email || profile.owner_address ?
          <div className='row StandOwnerInfo__contact-data'>
          {
            profile.owner_office_phone ?
              <div className='col s12 xl6'>
                <TextWithIcon
                  link={`tel:+521${profile.owner_office_phone}`}
                  color_icon='green-text' icon='call'
                  text={props.owner.profile.owner_office_phone} />
              </div> : null
          }
          {
            profile.owner_whatsapp ?
              <div className='col s12 xl6'>
                <TextWithIcon
                  link={`https://wa.me/+521${profile.owner_whatsapp}`}
                  color_icon='green-text' icon='whatsapp'
                  text={props.owner.profile.owner_whatsapp}/>
              </div> : null
          }
          {
            profile.owner_email ?
              <div className='col s12'>
                <TextWithIcon
                  link={`mailto:${profile.owner_email}`}
                  color_icon='red-text' icon='mail_outline'
                  text={profile.owner_email}
                  truncate={true} />
              </div> : null
          }
          {
            profile.owner_address ?
              <div className='col s12'>
                <TextWithIcon
                  link={`https://www.google.com/maps?q=${profile.owner_address}`}
                  icon='location_on' color_icon='red-text'
                  text={profile.owner_address}/>
              </div> : null
          }
          </div>
        : null
      }
    </div>
  );
};

export default StandOwnerInfo;
